const mongoose = require("mongoose");

/**
 * TODO: Ver melhor forma de adicionar a lista de exames
 */
const Exams = new mongoose.Schema({});

module.exports = mongoose.model("Exams", Exams);
