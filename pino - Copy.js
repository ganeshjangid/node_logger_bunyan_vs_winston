var fs = require('fs');
var pino=require('pino')
var pinoms = require('pino-multi-stream')
var streams = [
  {level: 'info', stream: fs.createWriteStream('./logs/server.log.%Y-%m-%d.log')}
];
var base=null;

var log = pinoms({streams: streams,base:base,
  useLevelLabels: true,
  timestamp: () => `,"timestamp":"${getCurrentDateTime()}"`
});

log[pino.symbols.endSym] = `}\n`


// Object.defineProperty(pino, '_lscache', {
//     value: {
//       10: '{"level": "trace"',
//       20: '{"level": "debug"',
//       30: '{"level": "info"',
//       40: '{"level": "warn"',
//       50: '{"level": "error"',
//       60: '{"level": "fatal"',
//     },
//   });

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


exports.logger=log;