const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * @swagger
 * definitions:
 *    Ultrasound:
 *      required:
 *        - pregnantId
 *      properties:
 *        date:
 *          type: string
 *        igDum:
 *          type: number
 *        igUsg:
 *          type: number
 *        fetalWeight:
 *          type: number
 *        placenta:
 *          type: number
 *        liquid:
 *          type: number
 *        others:
 *          type: object
 *        pregnantId:
 *          type: string
 */
const Ultrasound = new Schema(
  {
    date: Date,
    igDum: Number,
    igUsg: Number,
    fetalWeight: Schema.Types.Decimal128,
    placenta: Schema.Types.Decimal128,
    liquid: Schema.Types.Decimal128,
    others: {},
    pregnantId: {
      type: Schema.Types.ObjectId,
      ref: "Pregnant",
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { collection: "pregnantUltrasounds" }
);

module.exports = mongoose.model("Ultrasound", Ultrasound);
