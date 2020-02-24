var fs = require('fs');
var pino=require('pino')
var pinoms = require('pino-multi-stream')
var streams = [
  {level: 'info', stream: fs.createWriteStream('./logs/server.log.%Y-%m-%d.log')}
];
var base=null;
var log = pinoms({streams: streams,base:base});
log[pino.symbols.endSym] = `}\n`


Object.defineProperty(pino, '_lscache', {
    value: {
      10: '{"level": "trace"',
      20: '{"level": "debug"',
      30: '{"level": "info"',
      40: '{"level": "warn"',
      50: '{"level": "error"',
      60: '{"level": "fatal"',
    },
  });
exports.logger=log;