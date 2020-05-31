const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const User = require("../User");
const moment = require("moment");

/**
 * @swagger
 * definitions:
 *    Pregnants:
 *      required:
 *        - name
 *        - password
 *        - cpf
 *      properties:
 *        name:
 *          type: string
 *        cpf:
 *          type: string
 *        password:
 *          type: string
 *        email:
 *          type: string
 *        nickname:
 *          type: string
 *        birthday:
 *          type: string
 *        age:
 *          type: number
 *        workOutHome:
 *          type: boolean
 *        occupation:
 *          type: string
 *        address:
 *          type: string
 *        referencePoint:
 *          type: string
 *        city:
 *          type: string
 *        state:
 *          type: string
 *        cityCode:
 *          type: number
 *        tel:
 *          type: string
 *        singleHealthcareCardNumber:
 *          type: number
 *        socialIndentificationNumber:
 *          type: number
 *        dum:
 *          type: string
 *        dpp:
 *          type: string
 *        partnerId:
 *          type: string
 *        syphilisTreatmentId:
 *          type: string
 *        ferrousSulfateSupplementationId:
 *          type: string
 *        folicAcidSupplementationId:
 *          type: string
 *        familyHistoryId:
 *          type: string
 *        selfInformationsId:
 *          type: string
 *        currentPregnancyId:
 *          type: string
 *        tetanusVaccineId:
 *          type: string
 *        hepatitisBId:
 *          type: string
 *        influenzaId:
 *          type: string
 */
const PregnantSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true
    },
    nickname: {
      type: String,
      trim: true
    },
    birthday: Date,
    age: Number,
    workOutHome: Boolean,
    occupation: {
      type: String,
      trim: true
    },
    address: {
      type: String,
      trim: true
    },
    referencePoint: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      trim: true
    },
    state: {
      type: String,
      trim: true
    },
    cityCode: Number,
    tel: {
      type: String,
      trim: true
    },
    singleHealthcareCardNumber: Number,
    socialIndentificationNumber: Number,
    dum: Date,
    dpp: Date,
    partnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Partner"
    },
    babies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Baby"
      }
    ],
    syphilisTreatmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Syphilis"
    },
    ferrousSulfateSupplementationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FerrousSulfateSupplementation"
    },
    folicAcidSupplementationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FolicAcidSupplementation"
    },
    ultrasounds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ultrasound"
      }
    ],
    familyHistoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FamilyHistory"
    },
    selfInformationsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SelfInformation"
    },
    currentPregnancyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CurrentPregnancy"
    },
    tetanusVaccineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TetanusVaccine"
    },
    hepatitisBId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HepatitisB"
    },
    influenzaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Influenza"
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { discriminatorKey: "_type" }
);

PregnantSchema.methods = {
  hasPartner() {
    return !!this.partnerId;
  },
  weeks() {
    return this.dum
      ? moment()
          .startOf("day")
          .diff(moment(this.dum), "week")
      : undefined;
  }
};

PregnantSchema.pre("save", async function(next, error) {
  if (this.dum) {
    const dumDate = moment(this.dum);
    let dppDate;
    if (dumDate.month() <= 2) {
      dppDate = dumDate
        .add(7, "d")
        .add(9, "M")
        .toString();
    } else {
      dppDate = dumDate
        .add(7, "d")
        .subtract(3, "M")
        .add(1, "y")
        .toString();
    }

    this.dpp = dppDate;
    next();
  }
});

PregnantSchema.plugin(mongoosePaginate);

const Pregnant = User.discriminator("pregnant", PregnantSchema);

module.exports = Pregnant;
