import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AI Learning Platform API",
      version: "1.0.0",
      description: "REST API for AI-Driven Learning Platform",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./routes/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);
