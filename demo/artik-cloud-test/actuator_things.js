// PWM Sensor
var pwm = require('pwm').create();

var device = 0;
var channel = 0;
var period = 20000000;
var duty_cycle = 1500000;
var ret = 0;
var hnd = pwm.open(device, channel);

exports.startMotorCtrl = function(value){	
	switch(value){
		case 0 :
			duty_cycle = 500000;
			break;
		case 45 :
			duty_cycle = 1000000;
			break;
		case 90 :
			duty_cycle = 1500000;
			break;
		case 135 :
			duty_cycle = 2000000;
			break;
		case 180 :
			duty_cycle = 2500000;
			break;
		default :
			duty_cycle = 1500000;
			break;
	}
	ret = pwm.set_period(hnd, period);
	ret = pwm.set_duty_cycle(hnd, duty_cycle);
	ret = pwm.set_enabled(hnd, 1);		/* 0: disable, 1: enable */
}

exports.stopMotorCtrl = function(){
	console.log("Stop PWM Control");
	if(hnd){
		ret = pwm.set_enabled(hnd, 0);	/* 0: disable, 1: enable */
		ret = pwm.close(hnd);
	}
}
