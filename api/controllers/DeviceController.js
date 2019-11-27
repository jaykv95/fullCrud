var deviceService = require('../services').deviceService;
var models=require('../helpers/models')
var commonFunc=require('../helpers/common')
var msg=require('../helpers/message')
module.exports = {
    addDevice(req, res) {
        let isValidRequest;
        try {
             isValidRequest=commonFunc.isValidRequest(req.body,models.deviceModel)
             //console.log(isValidRequest)
        } catch(e) {
            //console.log(e.message);
            return res.status(400).send(e.message)
        }
        
        if(!isValidRequest){
            return res.status(400).send(msg.INVALID_REQ_MSG)
        }else{
            const body = req.body
            deviceService.createDevice(body,(err,result)=>{
                if(err){
                    return res.status(500).send(err);
                }else{
                    console.log(msg)
                    return res.status(200).send(msg.DEVICE_SAVED_SUCCESS);
                }
            });
        }

    },
    updateDevice(req, res) {
        deviceService.updateDevice();
        return res.status(200).send("Device updated succesfully.");
    }, 
    
      deleteDevice() { deviceService.deleteDevice();
        return res.status(200).send("Device saved succesfully.");
    },
    listDevices(req, res) {
        deviceService.listDevices((error, result) => {
            return res.status(200).send(result);
        }); 
    },
    getDeviceById(req, res) {
        let deviceId = req.query.deviceId;
        deviceService.getDeviceById(deviceId, (error, result) => {
            return res.status(200).send(result);
        });

    }
}