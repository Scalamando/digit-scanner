import { fabric as Fabric } from "fabric";

function main() {
	// Elements
	const digitElement = document.getElementById("digit");
	const countElement = document.getElementById("count");
	const clearButton = document.getElementById("clear");
	const sendButton = document.getElementById("send");

	// Events
	if (!clearButton || !sendButton)
		throw Error("Missing clear or send element!");
	clearButton.addEventListener("click", clearCanvas);
	sendButton.addEventListener("click", sendDigit);
	window.addEventListener("resize", fitCanvas, true);

	let canvas: Fabric.Canvas;
	let currentDigit: number;

	displayCounter();
	showNextDigit();
	setupCanvas();

	/*----------------------*/
	/*------- CANVAS -------*/
	/*----------------------*/
	function setupCanvas() {
		canvas = new Fabric.Canvas("canvas", { isDrawingMode: true });
		canvas.isDrawingMode = true;
		canvas.setBackgroundColor("#FFFFFF", () => {});

		let brush = canvas.freeDrawingBrush;
		brush.color = "#000";
		brush.width = 20;
	}

	function clearCanvas() {
		canvas.clear();
		canvas.setBackgroundColor("#FFFFFF", () => {});
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
		if (!digitElement) throw Error("Missing digit element!");

		currentDigit = getNextDigit();
		digitElement.innerText = currentDigit.toString();
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

		await fetch("/api/digits", {
			method: "POST",
			body: JSON.stringify({
				value: currentDigit,
				image,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		increaseCounter();
		displayCounter();

		clearCanvas();
		showNextDigit();
	}

	function increaseCounter() {
		const count = window.localStorage.getItem("count");

		if (count) {
			window.localStorage.setItem(
				"count",
				(Number(count) + 1).toString()
			);
		} else {
			window.localStorage.setItem("count", "1");
		}
	}

	function displayCounter() {
		if (!countElement) throw Error("Missing count element!");

		const count = window.localStorage.getItem("count");

		if (count) {
			countElement.innerText = `${count} ${
				Number(count) === 1 ? "Zahl" : "Zahlen"
			}`;
		} else {
			countElement.innerText = `fast etwas`;
		}
	}
}

window.onload = () => main();
