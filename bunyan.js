var bunyan = require('bunyan');
var RotatingFileStream = require('bunyan-rotating-file-stream');
var path = require ('path');
var applogger = new bunyan.createLogger({
    name: "bunyan-log123",
    // streams: [
    //     {
    //         level: 'error',
    //         path: './logs/server-%Y%m%d.log', // log ERROR and above to a file
    //         type: 'rotating-file',
    //         period: '1d',   // daily rotatio
    //         count: 3        // keep 3 back copies
    //     }
    //   ]
    streams: [{
        path: 'D:/Users/ganesh020/code/node_js/logger/logs/server-%Y%m%d.log',
        period: '1d',   // daily rotation
        count: 3,        // keep 3 back copies
        level: 'info'
    }]
});

// var applogger = new bunyan.createLogger({
//     name: 'project name',            
//     streams: [{
//         stream: new RotatingFileStream({
//             type: 'rotating-file',
//             path: './logs/server-%Y%m%d.log',
//             period: '1d',          // daily rotation 
//             totalFiles: 2,        // keep up to 10 back copies 
//             rotateExisting: true,  // Give ourselves a clean file when we start up, based on period 
//             threshold: '100m',      // Rotate log files larger than 10 megabytes 
//             totalSize: '100m',      // Don't keep more than 20mb of archived log files 
//            // gzip: true,             // Compress the archive log files to save space 
//             template: 'server-%Y%m%d.log' //you can add. - _ before datestamp.
//         })
//     }]
// });

applogger._emit = (rec, noemit) => {
    delete rec.pid;
    delete rec.hostname;
    delete rec.v;
    delete rec.name;
    bunyan.prototype._emit.call(applogger, rec, noemit);
  };
  
applogger.addSerializers({req: reqSerializer});
function reqSerializer(req) {
    return {
        method: req.method,
        url: req.url,
        headers: req.headers
    };
}
exports.logger=applogger;

