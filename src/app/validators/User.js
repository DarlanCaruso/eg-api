const Joi = require("joi");

module.exports = {
  name: Joi.string().required(),
  password: Joi.string().required(),
  cpf: Joi.string()
    .required()
    .regex(
      /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/
    )
};
