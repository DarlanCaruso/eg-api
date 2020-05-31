const Joi = require("joi");
const user = require("./User");

module.exports = {
  body: {
    ...user,
    tel: Joi.string()
      .required()
      .regex(/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/),
    partnerType: Joi.number()
      .required()
      .min(0)
      .max(4),
    pregnantId: Joi.string()
      .required()
      .regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
  }
};
