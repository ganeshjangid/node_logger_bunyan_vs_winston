const winston = require('winston');
require('winston-daily-rotate-file');
var path = require ('path');
var transports = [];
// var mvisalogger = winston.createLogger({
//     transports: [
//     	new winston.transports.DailyRotateFile({
//   		name: 'syndicate',
//         datePattern: '.yyyy-MM-dd',
//         format: winston.format.combine(
//             winston.format.timestamp(),
//             winston.format.json()
//         ),
//         levels: winston.config.npm.levels,
// 		filename: path.join(__dirname, "logs", "server.log"),
//         timestamp : function(){return  getCurrentDateTime() }
//         }),
         
//     ]
// });
var mvisalogger = winston.createLogger({
    transports: [
    	new winston.transports.DailyRotateFile({
  		name: 'syndicate',
        datePattern: '.YYYY-MM-DD',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        ),
		filename: path.join(__dirname, "logs", "server.log"),
		timestamp : function(){return getCurrentDateTime() }
     	})
    ]
});


exports.logger = mvisalogger;

function getCurrentDateTime() {
    
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
}
