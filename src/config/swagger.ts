import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
const swaggerUICss =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css";
import swaggerDocument from "../../swagger.json";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node Vercel API Documentation",
      version: "1.0.0",
      description: "API documentation for Node Vercel project",
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? process.env.VERCEL_URL
              ? `https://${process.env.VERCEL_URL}`
              : "https://your-production-url.vercel.app"
            : "http://localhost:3000",
        description:
          process.env.NODE_ENV === "production"
            ? "Production server"
            : "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/models/*.ts"], // Path to the API docs
};

export const setupSwagger = (app: Express) => {
  try {
    const swaggerSpec = swaggerJsdoc(options);
    app.use(
      "/api-docs",
      swaggerUi.serve as any,
      swaggerUi.setup(swaggerDocument, {
        customCss:
          ".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }",
        customCssUrl: swaggerUICss,
      }) as any
    );
    console.log("✅ Swagger UI available at /api-docs");
  } catch (error) {
    console.error("❌ Error setting up Swagger:", error);
  }
};
