import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";

/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Error Message"
 *         status:
 *           type: integer
 *           example: 500
 *         stack:
 *           type: string
 *           example: "Error Stack Trace"
 */
const errorHandler = (
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        message: err.message,
        stack: err.stack,
        status: err.statusCode,
    });
};

export default errorHandler;
