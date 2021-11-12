import { getRepository } from "typeorm";
import { Digit } from "../models/digit";

export interface IDigitPaylod {
	value: number;
	image: Buffer;
}

export const getDigits = async (): Promise<Array<Digit>> => {
	const digitRepository = getRepository(Digit);
	return digitRepository.find();
};

export const getDigit = async (id: number): Promise<Digit | null> => {
	const digitRepository = getRepository(Digit);
	const digit = await digitRepository.findOne(id);

	if (!digit) return null;
	return digit;
};

export const createDigit = async (payload: IDigitPaylod): Promise<Digit> => {
	const digitRepository = getRepository(Digit);
	const digit = new Digit();
	return digitRepository.save({ ...digit, ...payload });
};
