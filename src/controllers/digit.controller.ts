import Jimp from "jimp";
import { Route, Tags, Get, Post, Path, Body, Query } from "tsoa";
import { Digit } from "../models/digit";
import * as Repository from "../repositories/digit";

export interface IDigitRequestPayload {
	value: number;
	image: string;
}

@Route("digits")
@Tags("Digit")
export default class DigitController {
	@Get("/")
    public async getDigits(@Query() fields?: string[]): Promise<Array<Digit>> {
        return Repository.getDigits(fields);
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

        return Repository.createDigit({ ...body, image });
	}

	@Get("/count")
	public async countDigits(): Promise<number> {
        return Repository.countDigits();
    }
	}

	@Get("/:id")
	public async getDigit(@Path() id: string): Promise<Digit | null> {
        return Repository.getDigit(Number(id));
	}
}
