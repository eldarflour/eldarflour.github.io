#!/bin/sh

# abcpath; stackoverflow.com/a/51264222
#
# Takes a path argument and returns it as an absolute path.

abspath() {
	target="$1"

	if test "$target" = "."; then
		pwd
	elif test "$target" = ".."; then
		dirname "$(pwd)"
	else
		echo "$(cd "$(dirname "$1")" || exit 2; pwd)/$(basename "$1")"
	fi
}

# rreadlink; stackoverflow.com/a/29835459
#
# Executing the function in a *subshell* to localize variables and
# the effect of `cd`.

rreadlink() (
	CDPATH=""
	target="$1"
	target_dir=""
	fname=""

	# Try to make the execution environment as predictable as possible:
	# All commands below are invoked via `command`, so we must make sure
	# that `command` itself is not redefined as an alias or shell function.
	#
	# (Note that command is too inconsistent across shells, so we don't use it.)
	# `command` is a *builtin* in bash, dash, ksh, zsh, and some platforms do not
	# even have an external utility version of it (e.g, Ubuntu).
	#
	# `command` bypasses aliases and shell functions and also finds builtins
	# in bash, dash, and ksh. In zsh, option POSIX_BUILTINS must be turned on
	# for that to happen.
	{ \unalias command; \unset -f command; } >/dev/null 2>&1

	# make zsh find *builtins* with `command` too.
	[ -n "$ZSH_VERSION" ] && options[POSIX_BUILTINS]=on

	# Resolve potential symlinks until the ultimate target is found.
	while :; do
		[ -L "$target" ] || [ -e "$target" ] || { command printf '%s\n' "error: '$target' does not exist." >&2; return 1; }

		# Change to target dir; necessary for correct resolution of target path.
		command cd "$(command dirname -- "$target")"

		# Extract filename.
		fname=$(command basename -- "$target")

		# !! curiously, `basename /` returns '/'
		[ "$fname" = '/' ] && fname=''

		if [ -L "$fname" ]; then
			# Extract [next] target path, which may be defined *relative*
			# to the symlink's own directory.
			#
			# Note: We parse `ls -l` output to find the symlink target
			# which is the only POSIX-compliant, albeit somewhat fragile, way.
			target=$(command ls -l "$fname")
			target=${target#* -> }

			# Resolve [next] symlink target.
			continue
		fi

		# Ultimate target reached.
		break
	done

	# Get canonical dir. path
	target_dir=$(command pwd -P)

	# Output the ultimate target's canonical path. Note that we manually
	# resolve paths ending in /. and /.. to make sure we have a normalized path.

	if [ "$fname" = '.' ]; then
		command printf '%s\n' "${target_dir%/}"
	elif	[ "$fname" = '..' ]; then
		# Caveat: something like /var/.. will resolve to /private
		# (assuming /var@ -> /private/var), i.e. the '..' is applied
		# AFTER canonicalization.
		command printf '%s\n' "$(command dirname -- "${target_dir}")"
	else
		command printf '%s\n' "${target_dir%/}/$fname"
	fi
)

self="$0"
base="$(dirname "$(rreadlink "$(abspath "$self")")")"
lock="$base/.building"

src_dir="$base/src"
usr_dir="$base/usr"
etc_dir="$usr_dir/dev/etc"

dst_dir="$base/dst"
dst_dir_temp="$base/dst-temp"
dst_dir_prev="$base/dst-prev"

js_in="$src_dir/main.js"
js_in_made="$js_in.made"
js_out="$dst_dir_temp/main.js"

css_in="$src_dir/main.css"
css_in_made="$css_in.made"
precss="$src_dir/main.pre.css"
postcss="$src_dir/main.post.css"
css_out="$dst_dir_temp/main.css"

dev_js_in="$src_dir/dev/dev.js"
dev_js_out="$dst_dir_temp/main-dev.js"

if test -n "$1"; then
	mode="$1"
else
	mode="dev"
fi

if test -n "$2"; then
	previous_mode="$2"
else
	previous_mode=""
fi

clean() {
	rm -f "$precss"
	rm -f "$postcss"

	if test -e "$js_in_made"; then
		rm -f "$js_in_made"
		rm -f "$js_in"
	fi

	if test -e "$css_in_made"; then
		rm -f "$css_in_made"
		rm -f "$css_in"
	fi
}

warn() {
	>&2 echo "$1"
}

fail() {
	clean
	warn "error: $1"
	exit 1
}

command_exists() {
	if test -e "/dev/null"; then
		command -v "$1" > "/dev/null"
	else
		true
	fi
}

bundle() {
	in="$1"
	out="$2"
	other_options="$3"

	esbuild "$in" --outfile="$out" --bundle \
		--target=chrome58,firefox57,safari11,edge16 \
		--platform=browser \
		--loader:.svg=dataurl \
		--loader:.woff=dataurl \
		--log-level=error \
		--log-limit=0 \
		$other_options \
	|| fail "could not build $in"
}

bundle_min() {
	if test "$mode" = "pro"; then
		bundle "$1" "$2" "$3 --minify --keep-names --sourcemap"
	else
		bundle "$1" "$2" "$3"
	fi
}

preprocess() {
	lessc "$1" "$2" || fail "could not preprocess $in"
}

add_js_import() {
	path="$1"
	dir="$2"
	name="$3"

	if test -e "$dir/$name/$name.js"; then
		echo "import './$name/$name.js';" >> "$path"
	fi
}

add_css_import() {
	path="$1"
	dir="$2"
	name="$3"

	if test -e "$dir/$name/$name.css"; then
		echo "@import '$name/$name.css';" >> "$path"
	fi
}

write_main() {
	add_import_f="$1"
	main_path="$2"
	main_dir="$(dirname "$main_path")"
	sub_dirs="$(mktemp)"

	find "$main_dir" \
		-mindepth 1 -maxdepth 1 -type d \
		-not -name ".*" \
		-and -not -name "dev" \
		-and -not -name "init" \
		-and -not -name "main" \
	| sort > "$sub_dirs"

	find "$usr_dir/dev" \
		-mindepth 1 -maxdepth 1 -type d \
		-not -name ".*" \
		-and -not -name "etc" \
	| sort >> "$sub_dirs"

	$add_import_f "$main_path" "$main_dir" "init"

	while IFS= read -r sub_dir_path; do
		sub_dir_name="$(basename "$sub_dir_path")"
		$add_import_f "$main_path" "$main_dir" "$sub_dir_name"
	done < "$sub_dirs"

	$add_import_f "$main_path" "$main_dir" "main"

	rm -f "$sub_dirs"
}

write_main_js() {
	path="$1"

	write_main add_js_import "$path"

	if test -r "$usr_dir/dev/script.js"; then
		echo "import '../usr/dev/script.js';" >> "$path"
	fi

	touch "$js_in_made" || fail "could write in $src_dir"
}

write_main_css() {
	path="$1"

	write_main add_css_import "$path"

	if test -r "$usr_dir/dev/style.css"; then
		echo "@import '../usr/dev/style.css';" >> "$path"
	fi

	touch "$css_in_made" || fail "could write in $src_dir"
}

md_to_html() {
	# todo: when version 2.10.1 arrives, change to: --from=commonmark_x

	if test -n "$1"; then
		pandoc --from=markdown --to=html --output=- "$1"
	else
		pandoc --from=markdown --to=html --output=-
	fi
}

name_to_title() {
	echo "$1" | sed -E -e 's/([^-])-([^-])/\1 \2/g' -e 's/--/-/g'
}

html_header() {
	title="$1"

	echo "<!doctype html>"
	echo "<html>"
	echo "	<head>"
	echo "		<meta charset='utf-8'>"
	echo "		<meta name='viewport' content='width=device-width, initial-scale=1'>"
	echo "		<title>$title</title>"
	echo "		<style class='main'>"
	cat "$css_out"
	echo "		</style>"
	echo "		<noscript>"
	echo "			<style>"
	echo "				body,"
	echo "				body::before,"
	echo "				body::after {"
	echo "					user-select: auto;"
	echo "					pointer-events: auto;"
	echo "				}"
	echo "				body::before,"
	echo "				body::after {"
	echo "					opacity: 0;"
	echo "				}"
	echo "				body {"
	echo "					opacity: 1;"
	echo "				}"
	echo "			</style>"
	echo "		</noscript>"
	echo "		<script class='main'>"
	cat "$js_out"
	echo "		</script>"

	if test -r "$dev_js_out"; then
		echo "		<script class='dev'>"
		echo "			if (/[?&]dev=/.test(location.search)) {"
		echo "				var script = document.createElement('script');"
		echo "				script.src = '/main-dev.js';"
		echo "				document.head.appendChild(script);"
		echo "			}"
		echo "		</script>"
	fi

	echo "	</head>"
	echo "	<body>"
}

html_index() {
	subtitle="$1"
	indexed="$2"

	echo "<div class='index' data-indexed='$indexed'>"
	echo "	<span class='subtitle'>$subtitle</span>"

	if test -r "./index.md"; then
		md_to_html "./index.md"
	fi

	echo "</div>"
}

html_page() {
	title="$1"
	md_path="$2"
	md_path_stripped="$(echo "${md_path%.*}" | sed -E 's/^\.//')"

	echo "<div class='page' data-path='$md_path_stripped' data-title='$title'>"
	md_to_html "$md_path"
	echo "</div>"
}

html_footer() {
	echo "	</body>"
	echo "</html>"
}

copy_usr_file() {
	usr_path="$1"
	dst_path="$2"

	ln "$usr_path" "$dst_path"
}

copy_usr_md() {
	usr_path="$1"
	dst_path="$2"
	dst_index="$3"
	indexed="$4"

	dst_parent="$(dirname "$dst_path")"
	dst_file="$(basename "$dst_path")"
	dst_name="${dst_file%.*}"

	dst_content_path="$dst_parent/.$dst_name.html"
	dst_whole_path="$dst_parent/$dst_name.html"
	title="$(name_to_title "$dst_name")"

	mkdir -p "$dst_parent"

	html_header "$title" > "$dst_whole_path"
	html_index "$title" "$indexed" >> "$dst_whole_path"

	page_html="$(html_page "$title" "$usr_path")"
	echo "$page_html" >> "$dst_whole_path"
	echo "$page_html" > "$dst_content_path"
	echo "$page_html" >> "$dst_index"

	html_footer >> "$dst_whole_path"
}

copy_usr_path() {
	usr_path="$1"
	dst_index="$2"
	indexed="$3"

	usr_extension="${usr_path##*.}"
	dst_path="$dst_dir_temp/$usr_path"

	mkdir -p "$(dirname "$dst_path")" || fail "could not create $dst_path"

	if test "$usr_extension" = "md"; then
		copy_usr_md "$usr_path" "$dst_path" "$dst_index" "$indexed"
	else
		copy_usr_file "$usr_path" "$dst_path"
	fi
}

copy_usr() {
	cwd="$(pwd)"
	cd "$usr_dir" || fail "could not change directory to $usr_dir"

	dst_index="$dst_dir_temp/index.html"
	html_header "index" > "$dst_index"
	html_index "" >> "$dst_index"

	paths="$(mktemp)"
	all_paths="$(mktemp)"
	indexed_paths="$(mktemp)"

	find . -type f \
		-and -not -path "./dev" \
		-and -not -path "./index.md" \
		| sort \
	> "$all_paths"

	if test -r ./index.md; then
		cat ./index.md \
			| sed -E 's/]\(\/\)/](\/index)/g' \
			| md_to_html \
			| grep -Eo '<a href="([^"]+)' \
			| sed -E 's/<a href="([^"]*)/.\1.md/g' \
		> "$indexed_paths"
	fi

	# see: stackoverflow.com/a/20639730
	cat -n "$indexed_paths" "$all_paths" \
		| sort -uk2 \
		| sort -n \
		| cut -f2- \
	> "$paths"

	while IFS= read -r usr_path; do
		if test -r "$usr_path"; then
			if grep -q "${usr_path%.*}" "$indexed_paths"; then
				indexed="1"
			else
				indexed="0"
			fi

			copy_usr_path "$usr_path" "$dst_index" "$indexed"
		fi
	done < "$paths"

	rm -f "$indexed_paths"
	rm -f "$all_paths"
	rm -f "$paths"

	html_footer >> "$dst_index"

	cd "$cwd" || fail "could not change directory to $cwd"
}

build() {
	if ! test -e "$js_in"; then
		write_main_js "$js_in"
	fi

	if ! test -e "$css_in"; then
		write_main_css "$css_in"
	fi

	rm -rf "$dst_dir_temp" || fail "could not remove $dst_dir_temp"

	if test -r "$etc_dir"; then
		cp -al "$etc_dir" "$dst_dir_temp" || fail "could not copy $etc_dir"
	else
		mkdir "$dst_dir_temp" || fail "could not create $dst_dir_temp"
	fi

	bundle "$css_in" "$precss"
	preprocess "$precss" "$postcss"
	bundle_min "$postcss" "$css_out"
	bundle_min "$js_in" "$js_out"

	if test -r "$dev_js_in"; then
		bundle_min "$dev_js_in" "$dev_js_out"
	fi

	copy_usr

	if test -d "$dst_dir"; then
		rm -rf "$dst_dir_prev" || fail "could not remove $dst_dir_prev"
		mv "$dst_dir" "$dst_dir_prev" || fail "could not move $dst_dir"
	fi

	rm -rf "$dst_dir_temp/dev"
	mv "$dst_dir_temp" "$dst_dir" || fail "could not replace $dst_dir"
	rm -rf "$dst_dir_prev" || fail "could not remove $dst_dir_prev"
}

watch() {
	cwd="$(pwd)"
	cd "$base" || fail "could not change the directory to $base"

	while sleep 0.1; do
		find . -type f \
			-and \( \
				-path './lib/*' -or \
				-path './src/*' -or \
				-path './usr/*' -or \
				-path './build.sh' \
			\) \
			-not \( \
				-path './src/*/lib/*/src/*' -or \
				-path '*.map' \
			\) \
		| entr -d "$self" dev watch
	done

	cd "$cwd" || fail "could not change the directory to $cwd"
}

check() {
	if ! command_exists "pandoc"; then
		fail "the pandoc command was not found"
	fi

	if ! command_exists "esbuild"; then
		fail "the esbuild command was not found"
	fi

	if ! command_exists "lessc"; then
		fail "the lessc command was not found"
	fi

	if ! command_exists "entr"; then
		fail "the entr command was not found"
	fi
}

main() {
	check

	if test "$mode" = "watch"; then
		watch
	else
		if test "$previous_mode" = "watch"; then
			clear
			printf "...\r"
		fi

		# see: stackoverflow.com/a/24389468/15965362
		eval "exec 3>$lock"
		flock --exclusive 3 || fail "already building? (if not, remove $lock)"

		build
		clean

		if test -x "$usr_dir/dev/build.sh"; then
			"$usr_dir/dev/build.sh" "$base"
		fi

		# see: stackoverflow.com/a/24389468/15965362
		eval "exec 3>&-"

		if test "$previous_mode" = "watch"; then
			printf "\033[K"
		fi
	fi
}

main "$@"
