const express = require('express');
const Logger=require('./ganesh_log');
const logger=new Logger();
const app = express();
const port = 4040;

const handler = (func) => (req, res) => {
    try {
        console.time("dbsave");

        console.log('First Log is storing start with large file');
        for (var i = 0; i < 100000; i++){
            logger.log('info', "++++++++++BIO_INFO+++++++[{\"DEVICE_NAME\":\"MORPHO\",\"DEVICE_PACKAGE_NAME\":\"com.morpho.registerdeviceservice\",\"DEVICE_INFO_ACTION\":\"in.gov.uidai.rdservice.fp.INFO\",\"CAPTURE_ACTION\":\"in.gov.uidai.rdservice.fp.CAPTURE\",\"CAPTURE_XML\":\"<PidOptions ver=\\\"1.0\\\"><Opts format=\\\"0\\\" pidVer=\\\"2.0\\\" env=\\\"PP\\\" fCount=\\\"1\\\" fType=\\\"0\\\" timeout=\\\"10000\\\"/></PidOptions>\",\"RD_SERVICE_KEY\":\"RD_SERVICE_INFO\",\"DEVICE_KEY\":\"DEVICE_INFO\",\"SUPPORT_APP_DIST_URL\":\"https://play.google.com/store/apps/details?id=uidai.gov.in.managementclient&hl=en\",\"SUPPORT_APP_PACKAGE_NAME\":\"uidai.gov.in.managementclient\",\"ANDROIDUPDATEDVERSION\":\"100032\",\"ANDROIDMINVERSION\":\"100024\",\"IOSUPDATEDVERSION\":\"1.0\",\"IOSMINVERSION\":\"1.0\",\"VENDER_ID\":\"8797,1947\"},{\"DEVICE_NAME\":\"MANTRA\",\"DEVICE_PACKAGE_NAME\":\"com.mantra.rdservice\",\"DEVICE_INFO_ACTION\":\"in.gov.uidai.rdservice.fp.INFO\",\"CAPTURE_ACTION\":\"in.gov.uidai.rdservice.fp.CAPTURE\",\"CAPTURE_XML\":\"<PidOptions ver=\\\"1.0\\\"><Opts format=\\\"0\\\" pidVer=\\\"2.0\\\" env=\\\"PP\\\" fCount=\\\"1\\\" fType=\\\"0\\\" timeout=\\\"10000\\\"/></PidOptions>\",\"RD_SERVICE_KEY\":\"RD_SERVICE_INFO\",\"DEVICE_KEY\":\"DEVICE_INFO\",\"SUPPORT_APP_DIST_URL\":\"https://play.google.com/store/apps/details?id=com.mantra.clientmanagement&=en\",\"SUPPORT_APP_PACKAGE_NAME\":\"com.mantra.clientmanagement\",\"ANDROIDUPDATEDVERSION\":\"100032\",\"ANDROIDMINVERSION\":\"100024\",\"IOSUPDATEDVERSION\":\"1.0\",\"IOSMINVERSION\":\"1.0\",\"VENDER_ID\":\"1204,11279\"}]");
        }
        console.log('First Log is storing End');
        console.timeEnd("dbsave");
        func(req, res, logger);
    } catch(e){
        logger.info('server.handler.failed');
        res.send('Oh no, something did not go well!');
    }
};

app.get('/success', handler((req, res) => { res.send('Yay!'); }))
app.get('/error', handler((req, res) => { throw new Error('Doh!'); }))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))




