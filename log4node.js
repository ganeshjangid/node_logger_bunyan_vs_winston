const log4js = require('log4js');
var path = require ('path');

// log4js.configure({
//     appenders: { cheese: { type: 'file', filename: path.join(__dirname, "logs", "server.log") } },
//     categories: { default: { appenders: ['cheese'], level: 'info' } }
//   });


log4js.configure({
    appenders: { 'file': { type: 'file', filename: path.join(__dirname, "logs", "server.log") } },
    categories: { default: { appenders: ['file'], level: 'info' } }
  });


var applogger = log4js.getLogger('message');

  exports.logger=applogger;