import { join as pathJoin } from "path";
import "reflect-metadata";
import express, { Request, Response } from "express";
import { createConnection } from "typeorm";
import { Digit } from "./entity/Digit";

createConnection().then((connection) => {
	const digitRepo = connection.getRepository(Digit);

	const app = express();

	const PORT = 3000;

	app.use(express.static(pathJoin(__dirname + "/../public")));
	app.use("/digit", express.json());

	app.get("/", (_, res: Response) => {
		res.sendFile(pathJoin(__dirname + "/../public/index.html"));
	});

	app.get("/digit", async (req: Request, res: Response) => {
		if (req.query.id != null) {
			const digit = await digitRepo.findOne(req.query.id as string);

			res.send({
				...digit,
				image: digit.image
					.toString("base64")
					.replace("dataimage/jpegbase64", "data:image/jpeg;base64,"),
			});
		} else {
			const digits = await digitRepo.find();

			res.send(
				digits.map((digit) => ({
					value: digit.value,
					image: digit.image
						.toString("base64")
						.replace(
							"dataimage/jpegbase64",
							"data:image/jpeg;base64,"
						),
				}))
			);
		}
	});

	app.post("/digit", async (req: Request, res: Response) => {
		console.log("Received digit:", req.body.value);

		const image = Buffer.from(req.body.image as string, "base64");

		const digit = await digitRepo.save({
			value: req.body.value,
			image,
		});

		return res.send(digit);
	});

	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
});
