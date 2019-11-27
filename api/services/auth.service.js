var userRepository = require('../db/repositories/UserRepository');
var models = require('../db/models/index');
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var msg = require('../helpers/message')
var passport = require("../config/passport/passport");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

module.exports = {

  createUser(body, callback) {

  
    try {
      const userData = {
        name: body.name,
        password: body.password,
        email: body.email,
        mobileNumber: body.mobileNumber
      }
      models.Users.findOne({ where: { email: body.email } })
        .then(function (result) {
          const hash = bcrypt.hashSync(userData.password, 10)
          userData.password = hash;
          console.log(result);
          if (result != null) {
            return callback(msg.USER_ALREADY_EXISTS, null)
          } else {
            models.Users.create(userData)
              .then(user => {
                let token = jwt.sign(user.dataValues, "i am secret key", { expiresIn: 1440 })
                return callback(null, {token:token,user:user.dataValues});
              });
          }
        }).catch(function (fallback) {
          return callback(fallback, null)
        })
    } catch (error) {
      return callback(error, null)
    }
  },
  loginUser(body, callback) {
  
    models.Users.findOne({ where: { email: body.email } }).then(function (user) {
      console.log(user)
      if (user == null) {
        return callback("this user does not Exist", null)
      }
      else if (!bcrypt.compareSync(body.password, user.dataValues.password)) {
        return callback("invalid password", null)
      }
      else {
        let token = jwt.sign(user.dataValues, "i am secret key", { expiresIn: 14400 })
       console.log(token);
        return callback(null, {token:token,user:user.dataValues});
      }
    }).catch(function (fallback) {
      return callback(fallback)
    })
  },

  authentication(req, callback) {
    console.log('************',req.headers.authorization)
    if(req.headers.authorization != undefined){
        var decode = jwt.verify(req.headers.authorization.split(" ")[1], "i am secret key")
        console.log(decode)
        models.Users.findOne({ where: { email: decode.email } }).then(user => {
          if (user == null)
            return callback("invalid Token", null)
          else {
            console.log("user identified")
            return callback(null, user)
          }
        }).catch(fallback => {
          return callback(fallback, null)
        })
    }else{
      return callback("Forbidden", null)
    }
  }



};