function start_highlighter() {
	let body_classes = document.body.classList;

	window.addEventListener("click", function(event) {
		let parent_link = event.target.closest("a");
		let inside_link = parent_link !== null;
		let link_is_local = inside_link ? parent_link.href.includes("#") : false;

		if (!inside_link || link_is_local) {
			body_classes.toggle("highlighting-active");
		}
	});

	body_classes.add("highlighting");
}

function main() {
	start_highlighter();
}

function when_ready(f) {
	if (document.readyState != "loading") {
		f();
	} else {
		document.addEventListener("DOMContentLoaded", f);
	}
}

// todo: this should be when main.js emits a main-finished event, or is in the finished state
when_ready(main);
