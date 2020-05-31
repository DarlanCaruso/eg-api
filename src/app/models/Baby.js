const mongoose = require("mongoose");
const pregnant = require("./Pregnant");
const Pregnant = pregnant.Pregnant;

/**
 * @swagger
 * definitions:
 *    Babies:
 *      required:
 *        - name
 *        - sex
 *        - birthday
 *        - weight
 *        - length
 *        - childbirthType
 *        - pregnantId
 *      properties:
 *        name:
 *          type: string
 *        sex:
 *          type: boolean
 *        birthday:
 *          type: string
 *        weight:
 *          type: number
 *        length:
 *          type: number
 *        childbirthType:
 *          type: string
 *        partnerId:
 *          type: string
 *        pregnantId:
 *          type: string
 */
const Baby = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sex: {
    type: Boolean,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  length: {
    type: Number,
    required: true
  },
  childbirthType: {
    type: String,
    required: true
  },
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Partner"
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
});

Baby.pre("save", async function(next) {
  const pregnant = await Pregnant.findById(this.pregnantId);

  pregnant.babies.push(this);
  pregnant.save();
});

module.exports = mongoose.model("Baby", Baby);
