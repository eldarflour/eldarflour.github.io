function highlight() {
	if (document.querySelector(".page a")) {
		let body_classes = document.body.classList;

		body_classes.add("highlighting-active", "highlighting-first");

		document.addEventListener("scroll", function() {
			if (body_classes.contains("highlighting-first")) {
				this.removeEventListener('click', arguments.callee);
				body_classes.remove("highlighting-active", "highlighting-first");
			}
		});
	}
}

function main() {
	highlight();
}

function when_ready(f) {
	if (document.readyState != "loading") {
		f();
	} else {
		document.addEventListener("DOMContentLoaded", f);
	}
}

when_ready(main);
