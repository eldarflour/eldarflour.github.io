function start_highlighter() {
	let body_classes = document.body.classList;

	window.addEventListener("click", function(event) {
		let parent_link = event.target.closest("a");
		let inside_link = parent_link !== null;
		let link_is_local = inside_link ? parent_link.href.includes("#") : false;

		if (!inside_link || link_is_local) {
			body_classes.toggle("focus-active");
		}
	});

	body_classes.add("focus");
}

function fix_external_links() {
	let external_links = document.querySelectorAll("a[href*=':']");

	for (let i = 0; i < external_links.length; i++) {
		let external_link = external_links[i];
		external_link.setAttribute("target", "_blank");
	}
}

function show_body() {
	let styleNode = document.createElement("style");
	let style = `
		body,
		body::before,
		body::after {
			user-select: auto;
			pointer-events: auto;
		}

		body::before,
		body::after {
			opacity: 0;
		}

		body {
			opacity: 1;
		}
	`;

	styleNode.innerText = style;
	document.head.appendChild(styleNode);
}

function main() {
	start_highlighter();
	fix_external_links();
	show_body();
}

function when_ready(f) {
	if (document.readyState != "loading") {
		f();
	} else {
		document.addEventListener("DOMContentLoaded", f);
	}
}

when_ready(main);
