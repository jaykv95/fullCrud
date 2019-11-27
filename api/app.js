const express=require('express');
const app=express();
var router=express.Router();
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json')
var bodyParser=require('body-parser');
var cors=require('cors');
var session = require("express-session");
var passport = require("./config/passport/passport");
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions))
app.use(bodyParser.json(),bodyParser.urlencoded({ extended: true }))


var models = require('./db/models');

models.sequelize.sync().then(() => {
    console.log('Nice,Database looks fine')
}).catch(err => {
    console.log(err, 'Something went wrong with database update !')
})


app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/AuthRoutes')(app,router);
require('./routes/DeviceRoutes')(app,router);
require('./routes/CompanyRoutes')(app,router);

var options = {
    customCss: '.swagger-ui .topbar { display: none }'
  };
  
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument,options));
app.listen(process.env.PORT || 3000,()=>{
    console.log('Server started !')
});
app.use(function(error, req, res, next) {
  res.json({ message: error.message });
});

module.exports = app;