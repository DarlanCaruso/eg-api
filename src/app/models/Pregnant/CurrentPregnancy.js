const mongoose = require("mongoose");

/**
 * @swagger
 * definitions:
 *    CurrentPregnancy:
 *      required:
 *        - pregnantId
 *      properties:
 *        cigaretteNumbers:
 *          type: number
 *        alcohol:
 *          type: boolean
 *        otherDrugs:
 *          type: boolean
 *        domesticViolence:
 *          type: boolean
 *        aids:
 *          type: boolean
 *        syphilis:
 *          type: boolean
 *        toxoplasmosis:
 *          type: boolean
 *        urinaryInfection:
 *          type: boolean
 *        anemia:
 *          type: boolean
 *        cervicalInsufficiency:
 *          type: boolean
 *        threatOfPrematureBirth:
 *          type: boolean
 *        rhIsoimmunization:
 *          type: boolean
 *        polyhydramicOligo:
 *          type: boolean
 *        prematureRuptureOfMembranes:
 *          type: boolean
 *        restrictedIntrauterineGrowth:
 *          type: boolean
 *        post_datism:
 *          type: boolean
 *        fever:
 *          type: boolean
 *        arterialHpertension:
 *          type: boolean
 *        preeclampsiaOrEclampsia:
 *          type: boolean
 *        heartDisease:
 *          type: boolean
 *        gestationalDiabetes:
 *          type: boolean
 *        insulinUse:
 *          type: boolean
 *        firstTrimesterBleeding:
 *          type: boolean
 *        secondTrimesterBleeding:
 *          type: boolean
 *        thirdTrimesterBleeding:
 *          type: boolean
 *        skinRash:
 *          type: boolean
 *        pregnantId:
 *          type: string
 */
const CurrentPregnancy = new mongoose.Schema(
  {
    /**
     * Se não fuma, 0
     */
    cigaretteNumbers: Number,
    alcohol: Boolean,
    otherDrugs: Boolean,
    domesticViolence: Boolean,
    aids: Boolean,
    syphilis: Boolean,
    toxoplasmosis: Boolean,
    urinaryInfection: Boolean,
    anemia: Boolean,
    cervicalInsufficiency: Boolean,
    /**
     * Ameaça de parto prematuro
     */
    threatOfPrematureBirth: Boolean,
    rhIsoimmunization: Boolean,
    polyhydramicOligo: Boolean,
    prematureRuptureOfMembranes: Boolean,
    /**
     * Crescimento intra uterino restrito
     */
    restrictedIntrauterineGrowth: Boolean,
    post_datism: Boolean,
    fever: Boolean,
    arterialHpertension: Boolean,
    preeclampsiaOrEclampsia: Boolean,
    heartDisease: Boolean,
    gestationalDiabetes: Boolean,
    insulinUse: Boolean,
    firstTrimesterBleeding: Boolean,
    secondTrimesterBleeding: Boolean,
    thirdTrimesterBleeding: Boolean,
    /**
     * Exantema ou rash cutenêo
     */
    skinRash: Boolean,
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
  { collection: "pregnantCurrentPregnancy" }
);

module.exports = mongoose.model("CurrentPregnancy", CurrentPregnancy);
