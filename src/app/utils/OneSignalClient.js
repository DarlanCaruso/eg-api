const OneSignal = require("onesignal-node");
const oneSignalConfig = require("../../config/onesignal");

const oneSignalClient = new OneSignal.Client(oneSignalConfig);

module.exports = oneSignalClient;
