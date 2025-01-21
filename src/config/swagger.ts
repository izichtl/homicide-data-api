import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
const swaggerUICss =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css";
import swaggerDocument from "../../swagger.json";

export const setupSwagger = (app: Express) => {
  try {
    app.use(
      "/api-docs",
      swaggerUi.serve as any,
      swaggerUi.setup(
        process.env.NODE_ENV === "production"
          ? JSON.parse(
              JSON.stringify(swaggerDocument).replace(
                "http://localhost:3000",
                process.env.API_URL || ""
              )
            )
          : swaggerDocument,
        {
          customCss:
            ".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }",
          customCssUrl: swaggerUICss,
        }
      ) as any
    );
    console.log("✅ Swagger UI available at /api-docs");
  } catch (error) {
    console.error("❌ Error setting up Swagger:", error);
  }
};
