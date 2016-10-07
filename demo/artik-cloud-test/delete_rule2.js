var ArtikCloud = require('artikcloud-js');
var defaultClient = ArtikCloud.ApiClient.instance;

var artikcloud_oauth = defaultClient.authentications['artikcloud_oauth'];
artikcloud_oauth.accessToken = "be00bd45809943148b1ac1cda5c8b29c"; // users access token (common.artik)

var api = new ArtikCloud.RulesApi();

var ruleID_motor0 = "c1c2d46a60b14a4e9afac938eb805d2d";
var ruleID_motor45 = "02ba971854824c3a8b52f12ab02d8e65";
var ruleID_motor90 = "d57c73ab71b14196884b2c4ca6ca6f03";
var ruleID_motor135 = "28d241191be84f7086a0c6bc3755f944";
var ruleID_motor180 = "65382fc156574a2d8b5a504d34e53525";

var callback = function(error, data, response) { if (error) {
    console.error(error);
  } else {
    console.log('Remove rule successfully. Returned data: ' + data);
  }
};

api.deleteRule(ruleID_motor0, callback);
api.deleteRule(ruleID_motor45, callback);
api.deleteRule(ruleID_motor90, callback);
api.deleteRule(ruleID_motor135, callback);
api.deleteRule(ruleID_motor180, callback);
