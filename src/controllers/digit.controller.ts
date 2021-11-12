import Jimp from "jimp";
import { Route, Tags, Get, Post, Path, Body } from "tsoa";
import { Digit } from "../models/digit";
import {
	getDigits,
	createDigit,
	getDigit,
	countDigits,
} from "../repositories/digit";

export interface IDigitRequestPayload {
	value: number;
	image: string;
}

@Route("digits")
@Tags("Digit")
export default class DigitController {
	@Get("/")
	public async getDigits(): Promise<Array<Digit>> {
		return getDigits();
	}

	@Post("/")
	public async createDigit(
		@Body() body: IDigitRequestPayload
	): Promise<Digit> {
		const imageWithoutPrefix = body.image.replace(
			"data:image/jpeg;base64,",
			""
		);

		const imageBuffer = Buffer.from(imageWithoutPrefix, "base64");

		const image = await Jimp.read(imageBuffer).then(
			async (img) =>
				await img
					.resize(64, 64)
					.quality(80)
					.getBufferAsync(Jimp.MIME_JPEG)
		);

		return createDigit({ ...body, image });
	}

	@Get("/count")
	public async countDigits(): Promise<number> {
		return countDigits();
	}

	@Get("/:id")
	public async getDigit(@Path() id: string): Promise<Digit | null> {
		return getDigit(Number(id));
	}
}
