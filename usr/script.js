function highlight() {
	if (!window.location.hash && document.querySelector(".page a")) {
		document.body.classList.add("highlighting-active");
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
