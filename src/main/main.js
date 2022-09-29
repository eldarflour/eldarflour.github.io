function fix_external_links() {
	let external_links = document.querySelectorAll("a[href*=':']");

	for (let i = 0; i < external_links.length; i++) {
		let external_link = external_links[i];
		external_link.setAttribute("target", "_blank");
	}
}

function show_body() {
	// todo: this should be in init.js, when a usr-finished event is emitted

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
