const mongoose = require("mongoose");

/**
 * TODO: Somente para gestantes da Região Amazônica
 * FIXME: Verificar necessidade de implementação
 */
const Malaria = new mongoose.Schema({});

module.exports = mongoose.model("Malaria", Malaria);
