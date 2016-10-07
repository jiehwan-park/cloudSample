var WebSocket = require('ws');

var isWebSocketReady = false;
var ws = null;

var webSocketUrl = "wss://api.artik.cloud/v1.1/websocket?ack=true";
var did = "a84923401d1c44e3bbf0261aae684a6f";
var dtoken = "9b05672ba68546f9b31fd0060bfafa45"; // access token

/**
 * Create a /websocket device channel connection 
 */
function start() {
    //Create the websocket connection
    isWebSocketReady = false;
    ws = new WebSocket(webSocketUrl);
    ws.on('open', function() {
        console.log("Websocket connection is open ....");
        register(); // register device to cloud 
    });
    ws.on('message', function(data, flags) {
        var resobj = JSON.parse(data); // message from artik cloud
        if(resobj.type === "action"){
            if(resobj.data.actions[0].name === "setState"){
                if(resobj.data.actions[0].parameters.state === false){
                // Do what you want
                    sendData(true);
                }else{
                    // Do what you want
                    sendData(false);
                }
            }
        }
    });
    ws.on('close', function() {
        console.log("Websocket connection is closed ....");
        led.unexport();
    });
}

/**
 * Sends a register message to the websocket and starts the message flooder
 */
function register(){
    console.log("Registering device on the websocket connection");
    try{
        var registerMessage = '{"type":"register", "sdid":"'+did+'", "Authorization":"bearer '+dtoken+'"}';
        console.log('Sending register message ' + registerMessage + '\n');
        ws.send(registerMessage, {mask: true});
        isWebSocketReady = true;
    }
    catch (e) {
        console.error('Failed to register messages. Error in registering message: ' + e.toString());
    }   
}

/**
 * Send one message to ARTIK Cloud
 */
function sendData(state){
    try{
        var data = {
            "state": state
        };
        var payload = '{"sdid":"'+did+'", "type":"message", "data": '+JSON.stringify(data)+'}'; // message form
        console.log('Sending payload ' + payload);
        ws.send(payload, {mask: true});
    } catch (e) {
        console.error('Error in sending a message: ' + e.toString());
    }   
}

/**
 * All start here
 */
start(); // create websocket connection
