function main() {
	// Elements
	const digitElement = document.getElementById("digit");
	const clearButton = document.getElementById("clear");
	const sendButton = document.getElementById("send");

	// Events
	clearButton.addEventListener("click", clearCanvas);
	sendButton.addEventListener("click", sendDigit);
	window.addEventListener("resize", fitCanvas, true);

	let canvas;
	let currentDigit;

	showNextDigit();
	setupCanvas();

	/*----------------------*/
	/*------- CANVAS -------*/
	/*----------------------*/
	function setupCanvas() {
		canvas = new fabric.Canvas("canvas", { isDrawingMode: true });
		canvas.isDrawingMode = true;
		canvas.setBackgroundColor("#FFFFFF");

		let brush = canvas.freeDrawingBrush;
		brush.color = "#000";
		brush.width = 20;
	}

	function clearCanvas() {
		canvas.clear();
	}

	function fitCanvas() {
		const windowWidth = window.innerWidth;
		if (windowWidth < 400) {
			const size = windowWidth - 10;
			canvas.setDimensions({ width: size, height: size });
		} else {
			canvas.setDimensions({ width: 400, height: 400 });
		}
	}

	/*---------------------*/
	/*------- DIGIT -------*/
	/*---------------------*/
	function showNextDigit() {
		currentDigit = getNextDigit();
		digitElement.innerText = currentDigit;
	}

	function getNextDigit() {
		return Math.floor(Math.random() * 10);
	}

	async function sendDigit() {
		if (!window.localStorage) {
			alert("This function is not supported by your browser.");
			return;
		}

		const image = canvas.toDataURL({ format: "jpeg", quality: 80 });

		await fetch("/digit", {
			method: "POST",
			body: JSON.stringify({
				digit: currentDigit,
				image,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		clearCanvas();
		showNextDigit();
	}
}

window.onload = () => main();
