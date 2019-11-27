var companyController = require('../controllers/companyController')
var authcontroller = require('../controllers/AuthController')
const { check } = require('express-validator/check');
module.exports = (app, router) => {
    router.post('/company', [
        check('companyName', 'Please provide company name').not().isEmpty(),
        check('owner', 'Please provide owner name').not().isEmpty(),
        check('companyStatus', 'Please provide Company Status').not().isEmpty(),
        check('address', 'Please provide address').not().isEmpty()
    ], authcontroller.tokenAuthentication, companyController.addCompany);
    router.get('/allCompany', authcontroller.tokenAuthentication, companyController.getAll);
    router.delete('/company/:id', authcontroller.tokenAuthentication, companyController.deleteCompany);
    router.get('/company/:id', authcontroller.tokenAuthentication, companyController.getSingleRecord);
    router.put('/company/:id', [
        check('companyName', 'Please provide company name').not().isEmpty(),
        check('owner', 'Please provide owner name').not().isEmpty(),
        check('companyStatus', 'Please provide Company Status').not().isEmpty(),
        check('address', 'Please provide address').not().isEmpty()
    ], authcontroller.tokenAuthentication, companyController.updateCompany);
    app.use('/api', router)
}
