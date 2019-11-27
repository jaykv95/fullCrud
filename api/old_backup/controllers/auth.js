var express = require('express');
var router = express.Router();
var userModel = require('../services/user');
var userMailModel = require('../services/send_mail');
var con = require('../config/db');
//var nodemailer = require('nodemailer');
var validator = require('validator');


var auth = {
    router,
    // checkAuthenticated: async function checkAuthenticated(req, res, next) {

    //     if (!req.header('authorization')) {
    //         return res.status(401).send({ message: "Unauthorized, missing auth header" })
    //     }
    //     var token = req.header('authorization').split(' ')[1];

    //     var payload = jwt.decode(token, '123')
    //     if (!payload) {
    //         return res.status(401).send({ message: "Unauthorized, Auth header Invalid" })
    //     }
    //     else {
    //         let userEmail = req.header('currentuseremail');
    //         let user = await User.findOne({ email: userEmail });
    //         let payload2 = { sub: user._id }
    //         let token2 = jwt.encode(payload2, '123');
    //         if (token != token2) {
    //             return res.status(401).send({ message: "Unauthorized, Auth header Invalid" })
    //         }
    //     }

    //     req.userId = payload.sub;

    //     next();
    // }
}

router.post('/register', (req, res) => {
    var message;
    let userData = req.body;
    userModel.getUserByUsername(con,userData.useremail,userData.usertoken,(err,result)=>{
        if(!validator.isEmail(userData.useremail)){
            message =  {'status':'fail','data':'check_email_format'};
            res.status(500).send(message);
        }else{
            if (err){
                message =  {'status':'fail','data':err}
                res.status(500).send(message);
            }else{
                console.log(result.length)
                if (result.length >= 1){
                    message =  {'status':'fail','data':'user_already_exists'};
                    res.status(500).send(message);
                }else if(result.length == 0){
                    userModel.save_user(con,userData.useremail,userData.userphone,userData.username,userData.password,userData.usertoken,(err,result)=>{
                        if (err){
                            message =  {'status':'fail','data':err}
                        }else if(result.insertId != ""){
                            message =  {'status':'success','data':'data_inserted'};
                        }else{
                            message =  {'status':'success','data':'database_error'};
                        }
                        res.status(200).send(message);
                    });
                }            
            }  
        } 
    });
    
  })
router.post('/login', (req, res) => {
    var message;
    let userData = req.body;
    userModel.user_login(con,userData.username,userData.password,userData.usertoken,(err,result)=>{
        if(!validator.isEmail(useremail)){
            message =  {'status':'fail','data':'check_email_format'};
            res.status(500).send(message);
        }else{
            if (err){
                message =  {'status':'fail','data':err}
                res.status(200).send(message);
            }else{
                if (result.length == 0){
                    message =  {'status':'fail','data':'wrong_username_password'}
                }else{
                    message =  {'status':'success','data':'successful_login','userdata':result}
                }
                res.status(200).send(message);
            } 
        }
        
    });
  })

router.post('/forgot', (req, res) => {
    var message;
    let userData = req.body;
    userModel.getUserByUsername(con,userData.useremail,userData.usertoken,(err,result)=>{
        if(!validator.isEmail(userData.useremail)){
            message =  {'status':'fail','data':'check_email_format'};
            res.status(500).send(message);
        }else if (err){
            message =  {'status':'fail','data':err,}
            res.status(500).send(message);
        }else if (result.length == 0){
            message =  {'status':'fail','data':'emailid_doesnot_exists'}
            res.status(500).send(message);
        }else if(result.length = 1){
            userModel.forgot_password(con,userData.useremail,userData.usertoken,(err,result)=>{
                if (err){
                    message =  {'status':'fail','data':err}
                }else if (result.insertId != ""){
                    message =  {'status':'success','data':result}
                }else{
                    message =  {'status':'fail','data':'server_error'}
                }
                res.status(200).send(message);
            });
        }
    })
    
})
router.post('/forgotcodecheck', (req, res) => {
    var message;
    let userData = req.body;
    userModel.password_reset_code_check(con,userData.useremail,userData.passwordresetcode,userData.usertoken,(err,result)=>{
        if(!validator.isEmail(userData.useremail)){
            message =  {'status':'fail','data':'check_email_format'};
            res.status(500).send(message);
        }else if (err){
            message =  {'status':'fail','data':err}
            res.status(500).send(message);
        }else{
            message =  {'status':'success','data':result[0].resetcode_user_email}
            res.status(200).send(message);
        }
    });
    
})
router.post('/changepassword', (req, res) => {
    var message;
    let userData = req.body;
    userModel.user_changepassword(con,userData.useremail,userData.newpassword,userData.usertoken,(err,result)=>{
        if (err){
            message =  {'status':'fail','data':err}
            res.status(500).send(message);
        }else{
            message =  {'status':'success','data':'password_changed'}
            res.status(200).send(message);
        }
    });
    
})
router.post('/sendmail', (req, res) => {
    var mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rajeshprogrammer91@gmail.com',
          pass: 'dsdsdsd'
        }
      });
        
      var mailOptions = {
            user: 'rajeshprogrammer91@gmail.com',
            from: 'rajesh',
            to: 'rajesh.mandal@neocepts.co.in',
            subject: 'Sending Email using Node.js',
            html: '<h1>Welcome</h1><p>That was easy!</p>' ,
            attachments: [{
                filename: 'text1.txt',
                content: 'hello world!'
            }]
      }
        
      mail.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
      });
    res.status(200).send({ status: 'success', data: 'mail send' });
    
})
module.exports = auth; 