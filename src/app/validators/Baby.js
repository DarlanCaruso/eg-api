const Joi = require("joi");

module.exports = {
  body: {
    name: Joi.string().required(),
    sex: Joi.boolean().required(),
    birthday: Joi.date().required(),
    weight: Joi.number().required(),
    length: Joi.number().required(),
    childbirthType: Joi.string().required(),
    partnerId: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i),
    pregnantId: Joi.string()
      .required()
      .regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
  }
};
