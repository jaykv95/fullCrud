var deviceRepository = require('../db/repositories/DeviceRepository');
var models = require('../db/models/index');
var msg = require('../helpers/message')
module.exports = {
    createCompany(body, callback) {
        body.createdBy = body.owner;
        models.Company.findOne({ where: { address: body.address, owner: body.owner } })
            .then(function (result) {
                console.log("........company.....", result);
                console.log('.........result end..........')
                //console.log(ipAddress);
                //return false;
                // models.Company.create(body)
                // .then(devices =>{
                //     return callback(null,devices);
                // });
                if (result != null) {
                    return callback(msg.DEVICE_ALREADY_EXISTS, null)
                } else {
                    models.Company.create(body)
                        .then(devices => {
                            return callback(null, devices);
                        });
                }
            }).catch(function (e) {
                return callback("can not create the company")
            })
    },
    getAllCompany(body, callback) {
        models.Company.findAll({}).then(data => {
            return callback(null, data)
        }).catch(e => {
            return callback(e, null);
        })
    },
    delete(params, callback) {
        console.log("params", params)
        models.Company.findOne({ where: { id: params.id } })
            .then(data => {
                if (data == null) return callback({ msg: "no data exist of this companyName" }, null)
                else {
                    models.Company.destroy({ where: { id: params.id } }).then(
                        result => {
                            return callback(null, { msg: "company deleted Successfully", result: result })
                        }
                    ).catch(e => {
                        return callback({ e: e, msg: "can not delete the device" }, null)
                    })
                }
            }).catch(e => {
                return callback({ err: e, msg: "error occured ehile cheking the existence of data" }, null)
            })
    },

    getById(params, callback) {
        console.log("params", params.id)
        models.Company.findOne({ where: { id: params.id } })
            .then(data => {
                if (data == null) return callback({ msg: "no data exist of this companyName" }, null)
                else {
                    return callback(null, data)
                }
            }).catch(e => {
                return callback({ err: e, msg: "error occured ehile cheking the existence of data" }, null)
            })
    },
    update(req, callback) {
        const id = req.params.id;
        const updates = req.body;
        models.Company.findOne({ where: { id: id } })
            .then(data => {
                console.log("data",data)
                data.update(updates).then(
                    res => {
                        return callback(null, { msg: "company updated Successfully", res: res })
                    }
                ).catch(e => {
                    return callback({ err: e, msg: "error occured while updating data" }, null)
                }).catch(e => {
                    return callback({ err: e, msg: "err occured while checking existence of data for update" }, null)
                })
            })
    }
}