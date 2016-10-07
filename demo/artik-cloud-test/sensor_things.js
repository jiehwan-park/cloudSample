/*
 Simulated Sensor, the data will be increased as 1 every 10 seconds.
*/
var artik_server = require('./sensor_server.js');
// Interval
var iv; 
//Initial Sensor Data
var data = 103;

// ARTIK10 - Illuminator Sensor
// i2c
/*****************************************/
var i2c = require('i2c').create();
var bus = 7;		// ARTIK5: 7, ARTIK10: 9
var addr = 0x23;
var reg = 0x10;
var buf = new Array(10);

// initialize i2c sensor
var hnd = i2c.init(bus);
var ret = i2c.set_address(hnd, addr);

// write Byte
buf[0] = reg;
ret = i2c.write(hnd, buf, 1);

function float2int (value) {
    return value | 0;
}
/*****************************************/

console.log("start_light_sensor");

function updateSensor(){
	// read sensor data
	/*****************************************/	
	ret = i2c.read(hnd, buf, 2);
	data = float2int(((buf[0]<<8)|buf[1])/1.2);
	/*****************************************/	
	console.log("Created Sensor Data(%d)", data);
	//Send
	artik_server.sendToServer(data);
}

// Every 5 seconds, sensor data will be updated to ARTIK cloud
iv = setInterval(updateSensor, 5000);

