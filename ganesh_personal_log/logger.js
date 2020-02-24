const fs = require('fs');
const util = require('util');
const moment=require('moment');

class Logger {
    constructor() {
        this.logDirectory = 'logs/API_logs/';
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

    createLogFileName(path) {
        let currentTimeStamp = new Date();
        let year = currentTimeStamp.getFullYear();
        // let month = this.months[currentTimeStamp.getUTCMonth()];
        let month = currentTimeStamp.getUTCMonth() + 1;
        let day = currentTimeStamp.getDate();

        const logFileName = "ecommerceapilogfile.log";
        let logFilePath = this.logDirectory + year + '/' + month + '/' + day + '/' + logFileName;
        if (!fs.existsSync(logFilePath)) {
            let orderedArray = ['logs/API_logs/', 'logs/API_logs/' + year, 'logs/API_logs/' + year + '/' + month, 'logs/API_logs/' + year + '/' + month + '/' + day];
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
        let allowedSeverity = ['P', 'F'];

        let sLevel = '';

        if (allowedSeverity.indexOf(severity) > -1) {
            switch (severity) {
                case "P":
                    sLevel = "PASS";
                    break;
                case "F":
                    sLevel = "FAIL";
                    break;
                case "C":
                    sLevel = "CRITICAL";
                    break;
            }
        }

        let footPrint = '[' + fsStamp + '|' + sLevel + ']';
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
    log(logMessage, path, severity,fun_name,req_url) {
        let currentTimeStamp = new Date();
        let year = currentTimeStamp.getFullYear();
        // let month = this.months[currentTimeStamp.getUTCMonth()];
        let month = currentTimeStamp.getUTCMonth() + 1;
        let day = currentTimeStamp.getDate();
        this.createLogFileName(path);

        /**
         * @Push    Log Message into the Log File
         * @Format  TimeStamp|TestStatus LogMessage
         */
        let logPush = this.createFootPrintStencil(severity);
        logPush += '[' + path + ']';
        logPush += '[' + fun_name + ']';
        logPush += '[' + req_url + ']';
        logMessage += "\r\n";
        logPush += '[' + logMessage + ']';

        let filename = 'ecommerceapilogfile.log';

        let finalPath = this.logDirectory + year + '/' + month + '/' + day + '/' + filename;
        //fs.appendFileSync(finalPath, logPush);
        fs.appendFile(finalPath, logPush, function (err) {
        if (err) throw err;
           // return finalPath;
            console.log("log created successfully");
            
        }); 
        return finalPath;
        
    }
}

module.exports = Logger;