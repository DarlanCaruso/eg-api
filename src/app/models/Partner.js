const mongoose = require("mongoose");
const User = require("./User");

/**
 * @swagger
 * definition:
 *    Partners:
 *      required:
 *        - name
 *        - cpf
 *        - password
 *        - tel
 *        - partnerType
 *        - pregnantId
 *      properties:
 *        name:
 *          type: string
 *        cpf:
 *          type: string
 *        password:
 *          type: string
 *        tel:
 *          type: string
 *        partnerType:
 *          type: number
 *        pregnantId:
 *          type: string
 */
const Partner = User.discriminator(
  "partner",
  new mongoose.Schema(
    {
      tel: {
        type: String,
        trim: true,
        required: true
      },
      partnerType: {
        type: Number,
        required: true
      },
      pregnantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pregnant",
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    },
    { discriminatorKey: "_type" }
  )
);

module.exports = Partner;
