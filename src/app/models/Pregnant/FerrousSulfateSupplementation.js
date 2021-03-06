const mongoose = require("mongoose");

/**
 * @swagger
 * definitions:
 *    FerrousSulfateSupplementation:
 *      required:
 *        - pregnantId
 *      properties:
 *        monthOne:
 *          type: boolean
 *        monthTwo:
 *          type: boolean
 *        monthThree:
 *          type: boolean
 *        monthFour:
 *          type: boolean
 *        monthFive:
 *          type: boolean
 *        monthSix:
 *          type: boolean
 *        monthSeven:
 *          type: boolean
 *        monthEight:
 *          type: boolean
 *        monthNine:
 *          type: boolean
 *        pregnantId:
 *          type: string
 */
const FerrousSulfateSupplementation = new mongoose.Schema(
  {
    monthOne: Boolean,
    monthTwo: Boolean,
    monthThree: Boolean,
    monthFour: Boolean,
    monthFive: Boolean,
    monthSix: Boolean,
    monthSeven: Boolean,
    monthEight: Boolean,
    monthNine: Boolean,
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
  { collection: "pregnantFerrousSulfateSupplementations" }
);

module.exports = mongoose.model(
  "FerrousSulfateSupplementation",
  FerrousSulfateSupplementation
);
