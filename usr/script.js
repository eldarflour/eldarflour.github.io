function highlight() {
	if (!window.location.hash && document.querySelector(".page a")) {
		let body_classes = document.body.classList;
		body_classes.add("highlighting-active", "highlighting-first");
	}
}

function main() {
	//highlight();
}

function when_ready(f) {
	if (document.readyState != "loading") {
		f();
	} else {
		document.addEventListener("DOMContentLoaded", f);
	}
}

when_ready(main);
