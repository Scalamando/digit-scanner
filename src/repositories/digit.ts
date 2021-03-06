import { getRepository } from "typeorm";
import { Digit } from "../models/digit";

export interface IDigitPaylod {
    value: number;
    image: Buffer;
}

export const getDigits = async (fields?: string[]): Promise<Array<Digit>> => {
    const digitRepository = getRepository(Digit);

    const select = fields?.filter((field) =>
        ["id", "value", "image"].includes(field)
    ) as (keyof Digit)[];

    return select && select.length > 0
        ? digitRepository.find({ select })
        : digitRepository.find();
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

export const countDigits = async (): Promise<number> => {
    const digitRepository = getRepository(Digit);
    return digitRepository.count();
};
