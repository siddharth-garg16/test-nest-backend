import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const validateSchema = (schema: z.ZodTypeAny) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                status: 400,
                message: "Invalid Request",
                error: result.error.issues.map((issue) => {
                    return {
                        field: issue.path.join("."),
                        message: issue.message,
                    };
                }),
            });
        }

        req.body = result.data;
        next();
    };
};

export default validateSchema;
