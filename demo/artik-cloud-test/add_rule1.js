var ArtikCloud = require('artikcloud-js');
var defaultClient = ArtikCloud.ApiClient.instance;

var artikcloud_oauth = defaultClient.authentications['artikcloud_oauth'];
artikcloud_oauth.accessToken = "be00bd45809943148b1ac1cda5c8b29c"; // users access token (an4967@nate.com)

var api = new ArtikCloud.RulesApi();
var ruleInfo_motor0 = new ArtikCloud.RuleCreationInfo();	// {RuleCreationInfo} Rule object that needs to be added
var ruleInfo_motor180 = new ArtikCloud.RuleCreationInfo();	// {RuleCreationInfo} Rule object that needs to be added
var userId = "862c23b84f004cd9b0d70fe6541758c6";	// {String} User ID (an4967@nate.com)
var sdid = "dc40cb298a0b4974b91e6d2c9fdc816a";		// artik5 device id (an4967@nate.com)
var ddid = "6c56ee9bb5e24a2a88438d6ab4bd6281";		// artik10 device id (an4967@nate.com)

var callback = function(error, data, response) { if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};

ruleInfo_motor0.name = "Motor_0";
ruleInfo_motor0.description = "Motor degree 0";
ruleInfo_motor0.enable = true;
ruleInfo_motor0.rule = {"if": { "and": [ { "sdid": sdid, "field": "light", "operator" :">=", "operand": { "value" : 300 } } ] }, "then": [ { "ddid": ddid, "action": "setValue", "parameters": { "value": { "value": 0 } } } ] };

ruleInfo_motor180.name = "Motor_180";
ruleInfo_motor180.description = "Motor degree 180";
ruleInfo_motor180.enable = true;
ruleInfo_motor180.rule = {"if": { "and": [ { "sdid": sdid, "field": "light", "operator" :"<", "operand": { "value" : 300 } } ] }, "then": [ { "ddid": ddid, "action": "setValue", "parameters": { "value": { "value": 180 } } } ] };

api.createRule(ruleInfo_motor0, userId, callback);
api.createRule(ruleInfo_motor180, userId, callback);
