import { Request, Response, Router } from "express";
import DigitController from "../controllers/digit.controller";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
	res.render("index");
});

router.get("/digits", async (req: Request, res: Response) => {
	const controller = new DigitController();
	let digits = await controller.getDigits();

	const isSorted = req.query.sorted === "true";

	if (isSorted) {
		digits = digits.sort((a, b) => a.value - b.value);
	}

	res.render("digits", {
		digits: digits.map((digit) => ({
			...digit,
			image: digit.image.toString("base64"),
		})),
		sorted: isSorted,
	});
});

router.get("/digits/:id", async (req: Request, res: Response) => {
	const controller = new DigitController();
	const digits = await controller.getDigits();

	res.render("digits", {
		selected: Number(req.params.id),
		digits: digits
			.filter((digit) => digit.value === Number(req.params.id))
			.map((digit) => ({
				...digit,
				image: digit.image.toString("base64"),
			})),
	});
});

export default router;
