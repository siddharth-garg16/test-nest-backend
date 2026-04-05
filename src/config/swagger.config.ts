import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const swaggerOptions: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "TestNest Backend APIs",
            version: "1.0.0",
        },
    },
    apis: [
        path.join(__dirname, "../routes/*.ts"),
        path.join(__dirname, "../common/schema/*.ts"),
        path.join(__dirname, "../middlewares/*.ts"),
    ],
};

export const swaggerSpecification = swaggerJSDoc(swaggerOptions);
