var winston = require('winston');
require('winston-daily-rotate-file');
var path = require ('path');
var transports = [];
var common = require ('../common/common.js');
var mvisalogger = new (winston.Logger)({
    transports: [
    	new winston.transports.DailyRotateFile({
  		name: 'syndicate',
		datePattern: '.yyyy-MM-dd',
		filename: path.join(__dirname+"/../", "asma_log", "server.log"),
		timestamp : function(){return common.getCurrentDateTime() }
     	})
    ]
});

exports.logger = mvisalogger;



var moblogger = new (winston.Logger)({
    transports: [
    	new winston.transports.DailyRotateFile({
  		name: 'syndicate',
		datePattern: '.yyyy-MM-dd',
		filename: path.join(__dirname+"/../", "asma_log", "mob_server.log"),
		timestamp : function(){return common.getCurrentDateTime() }
     	})
    ]
});

exports.moblogger = moblogger;



var upiTestlogger = new (winston.Logger)({
    transports: [
    	new winston.transports.DailyRotateFile({
  		name: 'syndicate',
		datePattern: '.yyyy-MM-dd',
		filename: path.join(__dirname+"/../", "logs", "upiTestlogger.log"),
		timestamp : function(){return common.getCurrentDateTime() }
     	})
    ]
});


exports.upiTestlogger = upiTestlogger;