/*
 ARTIK server, if the date is arrived, the server can send it to ARTIK cloud using web socket.
*/
var WebSocket = require('ws');
var isWebSocketReady = false;
var ws = null;
var webSocketUrl = "wss://api.artik.cloud/v1.1/websocket?ack=true";
var device_id = "dc40cb298a0b4974b91e6d2c9fdc816a";     // ARTIK5 device id (an4967@nate.com)
var device_token = "fbc168035d504236bba99cb17ae249c8";  // ARTIK5 device token (an4967@nate.com)

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
    	console.log("Received Message: " + data + '\n');

        var resobj = JSON.parse(data); // message from artik cloud
        /*
        if(resobj.type === "action"){
            if(resobj.data.actions[0].name === "setStatus"){
                if(resobj.data.actions[0].parameters.state === "false"){
                    sendToThings(false);
                }else{
                    
                    sendToThings(true);
                }
            }
        }
        */
    });

    ws.on('close', function() {
        console.log("Websocket connection is closed ....");
    });

    ws.on('error', function(error) {        
    	console.log("Websocket connection Error : " + error.toString());
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

function sendToThings(state){
   //artik_things.sendToThings(state);
}

exports.sendToServer = function (light){
	console.log("call sendToServer");
	try{
        var data = {
            		"light": light
				   };

        var payload = '{"sdid":"'+device_id+'", "type":"message", "data": '+JSON.stringify(data)+'}';
        console.log('Sending payload ' + payload);
        ws.send(payload, {mask: true});
    } catch (e) {
       console.error('Error in sending a message: ' + e.toString());
    }
}

start();

