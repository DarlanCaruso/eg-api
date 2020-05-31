const mongoose = require("mongoose");

/**
 * @swagger
 * definitions:
 *    Syphilis:
 *      required:
 *        - pregnantId
 *      properties:
 *        firstDose:
 *          type: string
 *        secondDose:
 *          type: string
 *        thirdDose:
 *          type: string
 *        pregnantId:
 *          type: string
 */
const Syphilis = new mongoose.Schema({
  firstDose: Date,
  secondDose: Date,
  thirdDose: Date,
  pregnantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pregnant",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Syphilis", Syphilis);
