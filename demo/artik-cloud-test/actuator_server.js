/*
 ARTIK server, if the date is arrived, the server can send it to ARTIK cloud using web socket.
*/
var WebSocket = require('ws');
var device_led = require('./actuator_things.js');   // ARTIK10 - PWM Sensor

var isWebSocketReady = false;
var ws = null;
var webSocketUrl = "wss://api.artik.cloud/v1.1/websocket?ack=true";
var device_id = "6c56ee9bb5e24a2a88438d6ab4bd6281";     // ARTIK10 device id (an4967@nate.com)
var device_token = "49562e50d6164f9cae6b9145cf5dc7f7";  // ARTIK10 device token (an4967@nate.com)

function start() {
    //Create the websocket connection
    console.log("start_server");
    isWebSocketReady = false;
    ws = new WebSocket(webSocketUrl);
    ws.on('open', function() {
        console.log("Websocket connection is open ....");
        register(); // register device to cloud 
    });

    ws.on('message', function(data, flags) {
    	//console.log("Received Message: " + data + '\n');

        var resobj = JSON.parse(data); // message from artik cloud
        if(resobj.type === "action"){
            if(resobj.data.actions[0].name === "setValue"){
                var value = resobj.data.actions[0].parameters.value;
                console.log("value : %d", value);
                startMotorCtl(value);
            }
        }
    });

    ws.on('close', function() {
        console.log("Websocket connection is closed ....");
        stopMotorCtrl();
    });

    ws.on('error', function(error) {        
    	console.log("Websocket connection Error : " + error.toString());
        stopMotorCtrl();
    });

}

function register(){
    console.log("Registering device on the websocket connection");
  
    try{
	    var registerMessage = '{"type":"register", "sdid":"'+device_id+'", "Authorization":"bearer '+device_token+'"}';
        console.log('Sending register message ' + registerMessage + '\n');
        ws.send(registerMessage, {mask: true});
        isWebSocketReady = true;
    }
    catch (e) {
		console.error('Failed to register messages. Error in registering message: ' + e.toString());
    }
}

function startMotorCtl(value){
	device_led.startMotorCtrl(value);
}

function stopMotorCtrl(){
    device_led.stopMotorCtrl();
}

start();

