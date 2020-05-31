const mongoose = require("mongoose");

/**
 * @swagger
 * definition:
 *    Clinics:
 *      required:
 *        - objectId
 *        - name
 *        - genericName
 *        - atentionLevel
 *        - scale
 *        - neighborhood
 *        - county
 *        - uf
 *        - country
 *        - tel
 *        - geometry_x
 *        - geometry_y
 *      properties:
 *        objectId:
 *          type: number
 *        name:
 *          type: string
 *        genericName:
 *          type: string
 *        unitType:
 *          type: string
 *        atentionLevel:
 *          type: number
 *        scale:
 *          type: string
 *        lograd:
 *          type: string
 *        number:
 *          type: string
 *        cep:
 *          type: string
 *        neighborhood:
 *          type: string
 *        county:
 *          type: string
 *        uf:
 *          type: string
 *        tel:
 *          type: string
 *        servovert:
 *          type: string
 *        geometry_x:
 *          type: number
 *        geometry_y:
 *          type: number
 *        country:
 *          type: string
 */
const Clinics = new mongoose.Schema(
  {
    objectId: {
      type: Number,
      unique: true,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    genericName: {
      type: String,
      required: true
    },
    unitType: {
      type: String,
      required: true
    },
    atentionLevel: {
      type: String,
      required: true
    },
    scale: {
      type: String,
      required: true
    },
    lograd: {
      type: String
    },
    number: {
      type: String
    },
    cep: {
      type: String
    },
    neighborhood: {
      type: String,
      required: true
    },
    county: {
      type: String,
      required: true
    },
    uf: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    tel: {
      type: String,
      required: true
    },
    servovert: String,
    geometry_x: {
      type: Number,
      required: true
    },
    geometry_y: {
      type: Number,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { collection: "clinics" }
);

module.exports = mongoose.model("Clinics", Clinics);
