import { Router, Request, Response } from "express";
import Jimp from "jimp";
import DigitController from "../controllers/digit.controller";

const router = Router();

interface DigitStoreRequest extends Request {
	body: { value: number; image: string };
}

router.get("/", async (req: Request, res: Response) => {
	const controller = new DigitController();
	const response = await controller.getDigits();

	res.send(response);
});

router.post("/", async (req: DigitStoreRequest, res: Response) => {
	console.log("Received digit:", req.body.value);

	const controller = new DigitController();

	const imageWithoutPrefix = req.body.image.replace(
		"data:image/jpeg;base64,",
		""
	);

	const imageBuffer = Buffer.from(imageWithoutPrefix, "base64");

	const image = await Jimp.read(imageBuffer).then(
		async (img) =>
			await img.resize(64, 64).quality(80).getBufferAsync(Jimp.MIME_JPEG)
	);

	const response = await controller.createDigit({
		value: req.body.value,
		image,
	});

	return res.send(response);
});

router.get("/:id", async (req: Request, res: Response) => {
	const controller = new DigitController();
	const response = await controller.getDigit(req.params.id);

	if (!response) return res.status(404).send({ message: "No digit found" });
	return res.send(response);
});

export default router;
