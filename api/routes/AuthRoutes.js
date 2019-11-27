
var authController = require('../controllers/AuthController');
var passport = require("../config/passport/passport");
const { check } = require('express-validator/check');
module.exports = (app, router) => {

  router.post('/signup', [check('email', 'Your email is not valid').not().isEmpty().isEmail(),
  check('password', 'Your password must be at least 8 characters').not().isEmpty().isLength({ min: 8 })
  ], authController.signup);
  router.post('/login', [check('email', 'Your email is not valid').not().isEmpty().isEmail(),
  check('password', 'Your password must be at least 8 characters').not().isEmpty().isLength({ min: 8 })
  ], authController.login);

  app.use('/auth', router)
}