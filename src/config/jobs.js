const databaseConfig = require("./database");
module.exports = { db: { address: databaseConfig.uri } };
