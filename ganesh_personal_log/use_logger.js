const {to} = require('await-to-js');
const pe = require('parse-error');

const Logger=require("./logger");
const logger=new Logger();

const nodeMailer = require('nodemailer');
let transporter = nodeMailer.createTransport({
    host: 'mail.yobhaiya.in',
    port: 587,
    secure: false, //true for 465 port, false for other ports
    auth: {
        user: 'logs@yobhaiya.in',
        pass: 'Yobhaiya2468*'
    }
});


module.exports.to = async (promise) => {
    //console.log("hello");
    let err, res;
    [err, res] = await to(promise);
    //console.log(promise);
    if(err) return [pe(err)];

    return [null, res];
};

module.exports.ReE = function (req,res, err,error_url,fun_name,req_url,status,code){ // Error Web Response
    if(typeof err == 'object' && typeof err.message != 'undefined'){
        err = err.message;
    }

    if(typeof code !== 'undefined') res.statusCode = code;

/*     console.log(error_url);
    console.log(fun_name);
    console.log(req_url); */
    const result = logger.log(err, error_url, "F", fun_name, req_url);   
    //console.log(result);
    if (result) {
        const logs_view_api = req.protocol + '://' + req.get('host') + '/api/viewLogs?log_path=' + result;
        //console.log(logs_view_api);

        let mailOptions = {
            from: '"YoBhaiya" <logs@yobhaiya.in>', // sender address
            to: 'ganeshsuthar0708@gmail.com', // list of receivers
            subject: 'API Error from  ' + error_url, // Subject line
            html: '<b>API HIT</b>  ' + req_url + '<br><b>API SEE URL</b>  ' + logs_view_api // html body
        };
        transporter.sendMail(mailOptions, (error, info) => {
            //console.log(info);
            if (error) {
                //console.log(error);
                return res.json({
                    status: status,
                    error: err
                });
            }
        });
        return res.json({
            status: status,
            error: err
        });
    }
    
};

module.exports.ReS = function (res,data,status,code){ // Success Web Response
    let send_data = { status: status};

    if(typeof data == 'object'){
        send_data = Object.assign(data, send_data);//merge the objects
    }

    if(typeof code !== 'undefined') res.statusCode = code;

    return res.json(send_data)
};

module.exports.TE = TE = function(err_message, log){ // TE stands for Throw Error
    if(log === true){
        console.error(err_message);
    }
    throw new Error(err_message);
};


