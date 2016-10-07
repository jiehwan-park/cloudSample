var ArtikCloud = require('artikcloud-js');
var defaultClient = ArtikCloud.ApiClient.instance;

var artikcloud_oauth = defaultClient.authentications['artikcloud_oauth'];
artikcloud_oauth.accessToken = "be00bd45809943148b1ac1cda5c8b29c"; // users access token (common.artik)

var api = new ArtikCloud.RulesApi();

var ruleID_motor0 = "abd48971764248b48fb5e83ac2cbb066";
var ruleID_motor180 = "2fa7ae599181430db3f8facc7309df1f";

var callback = function(error, data, response) { if (error) {
    console.error(error);
  } else {
    console.log('Remove rule successfully. Returned data: ' + data);
  }
};

api.deleteRule(ruleID_motor0, callback);
api.deleteRule(ruleID_motor180, callback);
