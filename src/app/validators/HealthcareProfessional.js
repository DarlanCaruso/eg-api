const Joi = require("joi");
const user = require("./User");

module.exports = {
  body: {
    ...user
  }
};
