const Agenda = require("agenda");
const jobsConfig = require("../../config/jobs");

const agenda = new Agenda(jobsConfig);

module.exports = agenda;
