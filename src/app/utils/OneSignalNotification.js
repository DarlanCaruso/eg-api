const OneSignal = require("onesignal-node");

class OneSignalNotification {
  constructor(contentMessage, segments = ["All"], externalUsersIds = [], playersIds = []) {
    this.contentMessage = contentMessage;
    this.segments = segments;
    this.externalUsersIds = externalUsersIds;
    this.playersIds = playersIds;
  }

  getNotification() {
    return new OneSignal.Notification({
      contents: {
        en: this.contentMessage
      },
      included_segments: this.segments,
      include_player_ids: this.playersIds,
      include_external_user_ids: this.externalUsersIds
    });
  }
}

module.exports = OneSignalNotification;
