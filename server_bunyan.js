const express = require('express');
//const logger=require('./logger').logger;
const logger=require('./bunyan').logger;
const app = express();
const port = 4040;

const handler = (func) => (req, res) => {
    try {
        console.time("dbsave");

        console.log('First Log is storing start');
        for (var i = 0; i < 50000; i++){
            logger.info('**************** PayZapp Server, Listening @3045 ****************');
        }
        console.log('First Log is storing End');

        // console.log('Second Log is storing start');    
        // for (var i = 0; i < 50000; i++){
        //     logger.info('server.handler.begun');
        // } 
        // console.log('Second Log is storing End');
    
        
        // console.log('Third with 50000 Log is storing start');    
        // for (var i = 0; i < 50000; i++){
        //     logger.info('server.handler.begun');
        // } 
        // console.log('Third with 50000 Log is storing End');

        // for (var i = 0; i < 1000000; i++){
        //     logger.info('server.handler.begun');
        // }
        console.timeEnd("dbsave");
        func(req, res, logger);
    } catch(e){
        logger.info('server.handler.failed');
        res.send('Oh no, something did not go well!');
    }
};


app.use( (req, res, done) => {
    logger.info(req.originalUrl);
    done();
});
app.get('/success', handler((req, res) => { res.send('Yay!'); }))
app.get('/error', handler((req, res) => { throw new Error('Doh!'); }))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


// Test1- if test 1 loop with 100000 records

// dbsave: 564.264ms
//File siz:9.34 MB


// if i test 2 loop with 50000 records

// dbsave: 593.264ms
//File siz:1.86 MB


// if i test 3 loop with 50000 records

//dbsave: 961.930ms
//File siz:13.57 MB


// if i test 3 Time loop with 50000 records

//dbsave: 341.930ms
//File siz:4.57 MB

//dbsave: 291.756ms
//File siz:9.15 MB


//dbsave: 295.930ms
//File siz:13.57 MB

