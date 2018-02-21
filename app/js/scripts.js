/* Open */
function openNav(event) {
	event.preventDefault();
    document.getElementById("myNav").style.height = "100%";
}

/* Close */
function closeNav(event) {
	event.preventDefault();
    document.getElementById("myNav").style.height = "0%";
}