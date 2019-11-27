var companyService = require('../services').companyService;
var models = require('../helpers/models')
var commonFunc = require('../helpers/common')
var msg = require('../helpers/message')
const { validationResult } = require('express-validator/check');
module.exports = {
    addCompany(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array() );
        }
        let isValidRequest;
        try {
            isValidRequest = commonFunc.isValidRequest(req.body, models.companyModel)
            //console.log(isValidRequest)
        } catch (e) {
            //console.log(e.message);
            return res.status(400).send("Invalid Data Fields")
        }

        if (!isValidRequest) {
            return res.status(400).send(msg.INVALID_REQ_MSG)
        } else {
            const body = req.body
            companyService.createCompany(body, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                } else {
                    console.log(msg)
                    return res.status(200).send({ msg: "company created successfully", result: result });
                }
            });
        }

    },
    getAll(req, res) {
        companyService.getAllCompany(req, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                console.log(msg)
                return res.status(200).send(result);
            }
        });
    },

    deleteCompany(req, res) {
        const body = req.params
        companyService.delete(body, (err, result) => {
            if (err) return res.status(500).send(err);
            else {
                return res.status(200).send(result)
            }
        })
    },
    getSingleRecord(req, res) {
        companyService.getById(req.params, (err, result) => {
            if (err) return res.status(500).send(err);
            else {
                return res.status(200).send(result)
            }
        })
    },
    updateCompany(req,res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array() );
        }
        companyService.update(req, (err, result) => {
            if (err) return res.status(500).send(err);
            else {
                return res.status(200).send(result)
            }
        })
    }
};