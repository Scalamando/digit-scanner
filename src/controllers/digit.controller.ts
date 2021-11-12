import { Route, Tags, Get, Post, Path, Body } from "tsoa";
import { Digit } from "../models/digit";
import {
	getDigits,
	IDigitPaylod,
	createDigit,
	getDigit,
} from "../repositories/digit";

@Route("digits")
@Tags("Digit")
export default class DigitController {
	@Get("/")
	public async getDigits(): Promise<Array<Digit>> {
		return getDigits();
	}

	@Post("/")
	public async createDigit(@Body() body: IDigitPaylod): Promise<Digit> {
		return createDigit(body);
	}

	@Get("/:id")
	public async getDigit(@Path() id: string): Promise<Digit | null> {
		return getDigit(Number(id));
	}
}
