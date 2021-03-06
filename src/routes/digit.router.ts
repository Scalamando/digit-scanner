import { Router, Request, Response } from "express";
import DigitController from "../controllers/digit.controller";

const router = Router();

interface DigitStoreRequest extends Request {
    body: { value: number; image: string };
}

interface DigitGetAllRequest extends Request {
    query: { fields?: string };
}

router.get("/", async (req: DigitGetAllRequest, res: Response) => {
    const controller = new DigitController();
    const response = await controller.getDigits(req.query.fields?.split(","));

    res.send(response);
});

router.post("/", async (req: DigitStoreRequest, res: Response) => {
    console.log("Received digit:", req.body.value);

    const controller = new DigitController();
    const response = await controller.createDigit(req.body);

    return res.send(response);
});

router.get("/count", async (_, res: Response) => {
    const controller = new DigitController();
    const response = await controller.countDigits();

    res.send(response);
});

router.get("/:id/jpeg", async (req: Request, res: Response) => {
    const controller = new DigitController();
    const response = await controller.getDigitAsJpeg(req.params.id);

    if (!response) return res.status(404).send({ message: "No digit found" });
    res.type("image/jpeg").send(response);
});

router.get("/:id", async (req: Request, res: Response) => {
    const controller = new DigitController();
    const response = await controller.getDigit(req.params.id);

    if (!response) return res.status(404).send({ message: "No digit found" });
    return res.send(response);
});

export default router;
