const asyncHandler = require("express-async-handler");
const authMiddleware = require("./app/middlewares/auth");
const controller = require("./app/controllers");
const express = require("express");
const options = require("./config/swagger");
const routes = express.Router();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const validate = require("express-validation");
const validators = require("./app/validators");

const specs = swaggerJsdoc(options);

/**
 * Presentation
 */
routes.get("/", (req, res, next) => {
  return res.json({ text: "EG API - Cybernetic Group" });
});
/**
 * Swagger
 */
routes.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
/**
 * Pregnants
 */
routes.get("/pregnants", asyncHandler(controller.PregnantController.index));
routes.get(
  "/pregnants/:cpf",
  asyncHandler(controller.PregnantController.getPregnantByIdentifier)
);
routes.post(
  "/pregnants",
  validate(validators.Pregnant),
  asyncHandler(controller.PregnantController.store)
);
routes.put(
  "/pregnants/:id",
  authMiddleware,
  validate(validators.Pregnant),
  asyncHandler(controller.PregnantController.update)
);
routes.delete(
  "/pregnants/:id",
  authMiddleware,
  asyncHandler(controller.PregnantController.destroy)
);
/**
 * Partner
 */
routes.post(
  "/partners",
  validate(validators.Partner),
  asyncHandler(controller.PartnerController.store)
);
routes.put(
  "/partners/:id",
  authMiddleware,
  validate(validators.Partner),
  asyncHandler(controller.PartnerController.update)
);
routes.get("/partners/:id", asyncHandler(controller.PartnerController.show));
routes.delete(
  "/partners/:id",
  authMiddleware,
  asyncHandler(controller.PartnerController.destroy)
);
/**
 * Babies
 */
routes.post(
  "/babies",
  validate(validators.Baby),
  asyncHandler(controller.BabyController.store)
);
/**
 * Healthcare Professionals
 */
routes.post(
  "/professionals",
  validate(validators.HealthcareProfessional),
  asyncHandler(controller.HealthcareProfessionalController.store)
);
routes.get(
  "/professionals/:id",
  asyncHandler(controller.HealthcareProfessionalController.show)
);
routes.put(
  "/professionals/:id",
  authMiddleware,
  validate(validators.HealthcareProfessional),
  asyncHandler(controller.HealthcareProfessionalController.update)
);
routes.delete(
  "/professionals/:id",
  authMiddleware,
  asyncHandler(controller.HealthcareProfessionalController.destroy)
);
/**
 * Auth
 */
routes.post("/auth", asyncHandler(controller.AuthController.store));
/**
 * Clinics
 */
routes.get("/clinics", controller.ClinicsController.index);
routes.put("/clinics", controller.ClinicsController.update);

module.exports = routes;
