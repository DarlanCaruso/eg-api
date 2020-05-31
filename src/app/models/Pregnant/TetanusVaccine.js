const mongoose = require("mongoose");

/**
 * @swagger
 * definitions:
 *    TetanusVaccine:
 *      required:
 *        - pregnantId
 *      properties:
 *        immunizationYear:
 *          type: boolean
 *        firstDose:
 *          type: string
 *        secondDose:
 *          type: string
 *        dTpa:
 *          type: string
 *        pregnantId:
 *          type: string
 */
const TetanusVaccine = new mongoose.Schema(
  {
    /**
     * False: menos que 5 anos
     * True: mais que 5 anos
     * Undefined: sem imunização
     */
    immunizationYear: {
      type: Boolean
    },
    firstDose: Date,
    secondDose: Date,
    dTpa: Date,
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
  { collection: "pregnantTetanusVaccine" }
);

module.exports = mongoose.model("TetanusVaccine", TetanusVaccine);
