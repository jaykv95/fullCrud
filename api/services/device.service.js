var deviceRepository = require('../db/repositories/DeviceRepository');
var models = require('../db/models/index');
var msg=require('../helpers/message')
module.exports = {
    createDevice(body,callback) {
        models.Devices.findOne({ where: { macAddress: body.macAddress,ipAddress:body.ipAddress}})
        .then(function(result){
            console.log(result);
            //console.log(ipAddress);
            //return false;
            if(result != null){
                return callback(msg.DEVICE_ALREADY_EXISTS,null)
            }else{
                models.Devices.create(body)
                .then(devices =>{
                    return callback(null,devices);
                });
            }
        }).catch(function(fallback) {
            
        })
    },
    updateDevice() {
        deviceRepository.update_device();
        return 0;
    },
    deleteDevice() {
        deviceRepository.delete_device();
        return 0;
    },
    listDevices(cb) {
        models.Devices.findAll().then(devices => {
            if (devices) {
                return cb(null, devices);
            } else {
                return cb("Error: getting the device.", null);
            }
        });
    },
    getDeviceById(deviceId, cb) {
        models.Devices.findAll({ where: { id: deviceId } }).then(device => {
            if (device) {
                return cb(null, device);
            } else {
                return cb("Error: getting the device.", null);
            }
        });

    }
}