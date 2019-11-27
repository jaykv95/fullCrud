var authService = require('../services').authService;
var models = require('../helpers/models')
var commonFunc = require('../helpers/common')
var msg = require('../helpers/message')
var authService = require('../services').authService;
var loginUser = require('../config/passport/passport')
const { validationResult } = require('express-validator/check');
module.exports = {
    signup(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array() );
        }
        let isValidRequest;
        try {
            isValidRequest = commonFunc.isValidRequest(req.body, models.userModel)
            //console.log(isValidRequest)
        } catch (e) {
            //console.log(e.message);
            return res.status(400).send(e.message)
        }

        if (!isValidRequest) {
            return res.status(400).send(msg.INVALID_REQ_MSG)
        } else {
            const body = req.body
            authService.createUser(body, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                } else {
                    console.log(msg)
                    return res.status(200).send({ msg: msg.USER_SAVED_SUCCESS, result: result });
                }
            });
        }

    },
    login(req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }
        let isValidRequest;
        try {
            isValidRequest = commonFunc.isValidRequest(req.body, models.userLoginModel)
            //console.log(isValidRequest)
        } catch (e) {
            //console.log(e.message);
            return res.status(400).send(e.message)
        }

        if (!isValidRequest) {
            return res.status(400).send(msg.INVALID_REQ_MSG)
        } else {
            const body = req.body
            authService.loginUser(body, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                } else {
                    // console.log(msg)
                    return res.status(200).send({ msg: 'user Logged In', result: result });
                }
            });
        }

    },

    tokenAuthentication(req, res, next) {
        if (!req.header || req.header == null || req.header == undefined)
            return res.status(400).send("please provide token")
        else authService.authentication(req, (err, result) => {
            if (err) return res.status(500).send(err)
            else if (result != null)
                next();
        })
    }
    // signup(req, res) {
    //     authService.registerUser();
    //     return res.status(200).send("User signup succefully.")
    // },

    // login(req, res) {
    //     authService.loginUser();
    //     return res.status(200).send("User login succefully.")
    // },
    // resetPassword(req, res) {
    //     authService.resetPwd();
    //     return res.status(200).send("Password reset succefully.")
    // }

}