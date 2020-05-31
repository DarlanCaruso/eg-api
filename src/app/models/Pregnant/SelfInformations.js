const mongoose = require("mongoose");

/**
 * @swagger
 * definitions:
 *    SelfInfomations:
 *      required:
 *        - pregnantId
 *      properties:
 *        diabetes:
 *          type: boolean
 *        urinaryInfection:
 *          type: boolean
 *        breastfeedingDifficulty:
 *          type: boolean
 *        heartDisease:
 *          type: boolean
 *        thromboembolism:
 *          type: boolean
 *        arterialHypertension:
 *          type: boolean
 *        uterinePelvicSurgery:
 *          type: boolean
 *        surgery:
 *          type: boolean
 *        pregnantId:
 *          type: string
 */
const SelfInfomations = new mongoose.Schema(
  {
    diabetes: Boolean,
    urinaryInfection: Boolean,
    infertility: Boolean,
    /**
     * Dificuldade de amamentação
     */
    breastfeedingDifficulty: Boolean,
    /**
     * Cardiopatia
     */
    heartDisease: Boolean,
    thromboembolism: Boolean,
    arterialHypertension: Boolean,
    uterinePelvicSurgery: Boolean,
    surgery: Boolean,
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
  {
    collection: "pregnantSelfInformations"
  }
);

module.exports = mongoose.model("SelfInformation", SelfInfomations);
