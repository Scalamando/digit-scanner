import { Request, Response, Router } from "express";
import DigitController from "../controllers/digit.controller";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
	res.render("index");
});

router.get("/digits", async (req: Request, res: Response) => {
	const controller = new DigitController();
	const count = await controller.countDigits();
	let digits = await controller.getDigits();

	const isSorted = req.query.sorted === "true";

	if (isSorted) {
		digits = digits.sort((a, b) => a.value - b.value);
	}

	const decodedDigits = digits.map((digit) => ({
		...digit,
		image: digit.image.toString("base64"),
	}));

	res.render("digits", {
		digits: decodedDigits,
		sorted: isSorted,
		count,
	});
});

router.get("/digits/:id", async (req: Request, res: Response) => {
	const controller = new DigitController();
	const digits = await controller.getDigits();
	const count = await controller.countDigits();

	const selectedDigits = digits.filter(
		(digit) => digit.value === Number(req.params.id)
	);

	const decodedDigits = selectedDigits.map((digit) => ({
		...digit,
		image: digit.image.toString("base64"),
	}));

	res.render("digits", {
		selected: Number(req.params.id),
		digits: decodedDigits,
		count,
	});
});

export default router;
