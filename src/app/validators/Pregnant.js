const Joi = require("joi");
const user = require("./User");

module.exports = {
  body: {
    ...user,
    email: Joi.string().regex(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    ),
    nickname: Joi.string(),
    birthday: Joi.date(),
    age: Joi.number(),
    workOutHome: Joi.boolean(),
    occupation: Joi.string(),
    address: Joi.string(),
    referencePoint: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    cityCode: Joi.number(),
    tel: Joi.string().regex(
      /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/
    ),
    singleHealthcareCardNumber: Joi.number(),
    socialIndentificationNumber: Joi.number(),
    estimatedDateOfEarlyPregnancy: Joi.date(),
    partnerId: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i),
    babies: Joi.array().items(
      Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
    )
  }
};
