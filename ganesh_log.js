//const fs = require('fs');
const fs = require('graceful-fs');
const moment=require('moment');

class Logger {
    constructor() {
        this.logDirectory = 'logs/';
        this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    }

    checkOrderOfLogFolders(orderedArray = false) {
        if (orderedArray    != false && typeof orderedArray === 'object') {
            let orderedArrayLength = orderedArray.length;
            orderedArray.map((_elem) => {
                if (!fs.existsSync(_elem)) {
                    fs.mkdirSync(_elem, { recursive: true });
                }
            })
        }
    }

    createLogFileName() {
        let currentTimeStamp = new Date();
        let year = currentTimeStamp.getFullYear();
        // let month = this.months[currentTimeStamp.getUTCMonth()];
        let month = currentTimeStamp.getUTCMonth() + 1;
        let day = currentTimeStamp.getDate();

        const logFileName = "server.log";
        let logFilePath = this.logDirectory + year + '/' + month + '/' + day + '/' + logFileName;
        if (!fs.existsSync(logFilePath)) {
            let orderedArray = ['logs/', 'logs/' + year, 'logs/' + year + '/' + month, 'logs/' + year + '/' + month + '/' + day];
            this.checkOrderOfLogFolders(orderedArray);
            fs.open(logFilePath, 'a+', function (err, file) {
                if (err) throw err;
            });
        }
    }

    createFootPrintStencil(severity) {
        let footprintTimeStamp = new Date();
        let ISOformat = footprintTimeStamp.toISOString().split('T');
        let ISOformatMili = ISOformat[1].split('.');

       // let fsStamp = ISOformat[0] + ' ' + ISOformatMili[0];
        let fsStamp = moment(new Date()).format("YYYY-MM-DD HH:MM:SS");
        // console.log(">> Logging FSSTAMP " + fsStamp);
        let allowedSeverity = ['info', 'warn'];

        let sLevel = '';
        if (allowedSeverity.indexOf(severity) > -1) {
            switch (severity) {
                case "info":
                    sLevel = "error";
                    break;
                case "warn":
                    sLevel = "warn";
                    break;
                case "C":
                    sLevel = "CRITICAL";
                    break;
            }
        }

        let footPrint = ''+ sLevel + '';
        return footPrint;
    }

    /**
     * @Function log <> void
     * @param {*} logMessage
     * @param {*} path
     * @param {*} severity {PASS, FAIL}
     * @param {*} error_url {failed page url}
     * @param {*} fun_name {failed function name}
     * @param {*} req_url {API call url}
     * 
     */
    log(severity,logMessage) {
        let currentTimeStamp = new Date();
        let year = currentTimeStamp.getFullYear();
        // let month = this.months[currentTimeStamp.getUTCMonth()];
        let month = currentTimeStamp.getUTCMonth() + 1;
        let day = currentTimeStamp.getDate();
        this.createLogFileName();
        let fsStamp = moment(new Date()).format("YYYY-MM-DD HH:MM:SS");

        /**
         * @Push    Log Message into the Log File
         * @Format  TimeStamp|TestStatus LogMessage
         */
        let logPushObj={};
        logPushObj['level'] = this.createFootPrintStencil(severity);
        logPushObj['message']=logMessage;
        logPushObj['timestamp']=fsStamp;
        //logPush += '[' + path + ']';
        //logPush += '[' + fun_name + ']';
        //logPush += '[' + req_url + ']';
        //logMessage += "\r\n";

        let logPush=JSON.stringify(logPushObj);
        logPush += "\r\n";

        let filename = 'server.log';

        let finalPath = this.logDirectory + year + '/' + month + '/' + day + '/' + filename;
        //fs.appendFileSync(finalPath, logPush);
        fs.appendFile(finalPath, logPush, function (err) {
        if (err) throw err;
           // return finalPath;
            //console.log("log created successfully");
        }); 
        return finalPath;
        
    }
}

module.exports = Logger;