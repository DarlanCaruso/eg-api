const mongoose = require("mongoose");

/**
 * @swagger
 * definitions:
 *    FamilyHistory:
 *      required:
 *        - pregnantId
 *      properties:
 *        diabetes:
 *          type: boolean
 *        arterialHypertension:
 *          type: boolean
 *        moan:
 *          type: boolean
 *        pregnantId:
 *          type: string
 */
const FamilyHistory = new mongoose.Schema(
  {
    diabetes: Boolean,
    arterialHypertension: Boolean,
    /**
     * Gemelar
     */
    moan: Boolean,
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
  { collection: "pregnantFamilyHistorys" }
);

module.exports = mongoose.model("FamilyHistory", FamilyHistory);
