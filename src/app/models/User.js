const authConfig = require("../../config/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

/**
 * @swagger
 * definitions:
 *    Users:
 *      required:
 *        - password
 *        - cpf
 *      properties:
 *        name:
 *          type: string
 *        cpf:
 *          type: string
 *        password:
 *          type: string
 */
const User = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    cpf: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: true
    },
    password: {
      type: String,
      trim: true,
      required: true
    }
  },
  { collection: "users", discriminatorKey: "_type" }
);

User.pre("save", async function(next, error) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 8);
  this.cpf = parseInt(this.cpf.replace(/[^0-9]/g, ""));

  if (isNaN(this.cpf)) {
    throw new Error("O formato do CPF está inválido");
  }
});

User.methods = {
  compareHash(password) {
    return bcrypt.compare(password, this.password);
  }
};

User.statics = {
  generateToken({ id }) {
    return jwt.sign({ id }, authConfig.secret, { expiresIn: authConfig.ttl });
  }
};

module.exports = mongoose.model("User", User);
