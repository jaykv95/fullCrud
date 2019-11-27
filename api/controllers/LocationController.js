var locationService = require('../services').locationsServices;
var models = require('../helpers/models')
var commonFunc = require('../helpers/common')
module.exports = {
    addLocation(req, res) {
        let isValidRequest;
        try {
            isValidRequest = commonFunc.isValidRequest(req.body, models.locationModel)
            //console.log(isValidRequest)
        } catch (e) {
            //console.log(e.message);
            return res.status(400).send(e.message)
        }

        if (!isValidRequest) {
            return res.status(400).send("Invalid Request")
        } else {
            const body = req.body;
            locationService.createLocation(body, (err, result) => {
                if(err) {
                    return res.status(500).send(err);
                }
                else {
                    return res.status(200).send("Location saved Successfully");
                }
            });
        }
    },


    getLocationById(req, res) {
        let userId = req.params.userId;
        locationService.getLocationById(userId, (error, result) => {
            return res.status(200).send(result)

        });

    }
}