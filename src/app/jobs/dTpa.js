const agenda = require("../utils/Agenda");
const oneSignalClient = require("../utils/OneSignalClient");
const OneSignalNotification = require("../utils/OneSignalNotification");

const pregnant = require("../models/Pregnant");
const Pregnant = pregnant.Pregnant;

/**
 * Envia notificações de vacina dTpa para todas as gestantes que estão na idade
 * gestacional entre a semana 27ª e 36ª
 */
agenda.define("send dTpa", async job => {
  const pregnants = await Pregnant.find({});

  let externalUserIds = [];
  pregnants.map(pregnant => {
    const weeks = pregnant.weeks();
    if (weeks && weeks >= 27 && weeks <= 36) {
      externalUserIds.push(pregnant.id);
    }
  });

  const notification = new OneSignalNotification(
    "No seu período atual de gestação, é necessário tomar a vacina dTpa que previne contra Coqueluche, Tétano e Difteria",
    ["Active Users", "Inactive Users"],
    [externalUserIds]
  ).getNotification();

  oneSignalClient.sendNotification(notification, (err, httpResponse, data) => {
    if (err) {
      console.log({ job: "send dTpa", err });
    } else {
      console.log(data);
    }
  });
});

(async function() {
  console.log("JOB: dTpa started successfully");
  await agenda.start();
  await agenda.every("1 week", "send dTpa");
})();
