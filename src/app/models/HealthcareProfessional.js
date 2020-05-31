const mongoose = require("mongoose");
const User = require("./User");

/**
 * @swagger
 * definitions:
 *    HealthcareProfessionals:
 *      required:
 *        - name
 *        - cpf
 *        - password
 *      properties:
 *        name:
 *          type: string
 *        cpf:
 *          type: string
 *        password:
 *          type: string
 */
const HealthcareProfessional = User.discriminator(
  "healthcareProfessional",
  new mongoose.Schema(
    {
      createdAt: {
        type: Date,
        default: Date.now
      }
    },
    { discriminatorKey: "_type" }
  )
);

module.exports = HealthcareProfessional;
