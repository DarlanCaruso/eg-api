const mongoose = require("mongoose");

/**
 * @swagger
 * definitions:
 *    Influenza:
 *      required:
 *        - pregnantId
 *      properties:
 *        dateOfApplication:
 *          type: string
 *        pregnantId:
 *          type: string
 */
const Influenza = new mongoose.Schema(
  {
    dateOfApplication: Date,
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
  { collection: "pregnantInfluenza" }
);

module.exports = mongoose.model("Influenza", Influenza);
