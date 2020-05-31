require("dotenv").config({
  path: process.env.NODE_ENV.trim() === "test" ? ".env.test" : ".env"
});
require("./app/jobs");

const Agenda = require("agenda");
const Agendash = require("agendash");
const databaseConfig = require("./config/database");
const express = require("express");
const jobsConfig = require("./config/jobs");
const logger = require("morgan");
const mongoose = require("mongoose");
const validate = require("express-validation");
const Youch = require("youch");

class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV !== "production";
    this.agenda = new Agenda(jobsConfig);

    this.database();
    this.middlewares();
    this.routes();
    this.exception();
  }

  database() {
    mongoose.connect(databaseConfig.uri, {
      autoIndex: false,
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true
    });
  }

  middlewares() {
    this.express.use(logger("dev"));
    this.express.use(express.json());
    this.express.use("/dash", Agendash(this.agenda));
  }

  routes() {
    this.express.use(require("./routes"));
  }

  exception() {
    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err);
      }

      if (process.env.NODE_ENV !== "production") {
        const youch = new Youch(err);

        return res.json(await youch.toJSON());
      }

      return res.status(err.status || 500).json({
        status: err.status,
        message: "Internal Server Error",
        error: err
      });
    });
  }
}

module.exports = new App().express;
