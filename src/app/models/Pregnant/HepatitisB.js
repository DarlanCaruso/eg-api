const mongoose = require("mongoose");

/**
 * @swagger
 * definitions:
 *    HepatitisB:
 *      required:
 *        - pregnantId
 *      properties:
 *        firstDose:
 *          type: string
 *        secondDose:
 *          type: string
 *        thridDose:
 *          type: string
 *        immunized:
 *          type: boolean
 *        pregnantId:
 *          type: string
 */
const HepatitisB = new mongoose.Schema(
  {
    firstDose: Date,
    secondDose: Date,
    thridDose: Date,
    immunized: Boolean,
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
  { collection: "pregnantHepatitis" }
);

module.exports = mongoose.model("HepatitisB", HepatitisB);
