var express = require("express");
var router = express.Router();
var pool = require("../config/db");

//Add Location
router.post("/addLocation", (req, res) => {
  console.log(req.body);
  var userId = req.body.userId;
  var locationName = req.body.locationName;
  var queryString = `SELECT * from h_location where userId = ${userId} and lower(locationName) = lower(\'${locationName}\')`;
  pool.query(queryString, function(error, results, fields) {
    if (error) {
      res.status(200).json({ message: "Error Querying Database " + error});
    } else {
      if (results.length > 0) {
        res.status(200).json({ message: "Location Already Exists" });
      } else {
        queryString = `INSERT INTO h_location (userId,locationName) values(${userId},'${locationName}')`;
        pool.query(queryString, function(error, results, fields) {
          if (error) {
            res
              .status(200)
              .json({ message: "Error Inserting into Location Table" });
          } else {
            res.status(200).json({ message: "Location Saved Successfully" });
          }
        });
      }
    }
  });
});

//Get All Devices
router.get("/get_all_devices", (req, res) =>{
  console.log('all devices viewed');
  pool.query('SELECT * FROM h_devices ORDER BY deviceid ASC',(err, rows, fields) => { 
    if(!err)
    {
      res.send(rows);
    }

    else 
    {
      console.log(err); 
    }
      
  })
});

//Create Schedule
router.post("/create_schedule", (req, res) => {
  console.log(req.body);
  var scheduleId = req.body.scheduleId;
  var deviceId = req.body.deviceId;
  var startDate = req.body.startDate;
  var startTime = req.body.startTime;
  var endDate = req.body.endDate;
  var endTime = req.body.endTime;
  var type = req.body.type;
  var queryString = `SELECT * from h_schedules where scheduleId = ${scheduleId}`;
  console.log('Schedule created');
  pool.query(queryString, function(error, results, fields) {
    if (error) {
      res.status(200).json({ message: "Error Querying Database " + error});
    } else {
      if (results.length > 0) {
        res.status(200).json({ message: "Schedule Already Exists" });
      } else {
        queryString = "INSERT INTO `h_schedules`(`scheduleId`,`deviceId`,`startDate`,`startTime`,`endDate`,`endTime`,`type`) VALUES ('"+scheduleId+"','"+deviceId+"','"+startDate+"','"+startTime+"','"+endDate+"','"+endTime+"','"+type+"')";
        console.log(queryString);
        pool.query(queryString, function(error, results, fields) {
          if (error) {
            res
              .status(200)
              .json({ message: "Error Inserting into schedule Table" }, error);
          } else {
            res.status(200).json({ message: "Schedule Added Successfully" });
          }
        });
      }
    }
  });
});


//Get Schedules
router.get('/get_all_schedule',(req,res)=>{
  console.log('all Schedule viewed');
  pool.query('SELECT * FROM h_schedules',(err,rows,fields)=>{
    if (!err)
    res.send(rows);
else
    console.log(err);
  })
});

//Get Schedule by ID
router.get('/get_schedule/:id', (req, res) => {
  console.log('Schedule viewed by id');
    pool.query('SELECT * FROM h_schedules WHERE scheduleId =?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Update schedule by ID
router.put("/update_schedule/:id", (req, res) => {
  console.log(req.body);
  var scheduleId = req.body.scheduleId;
  var deviceId = req.body.deviceId;
  var startDate = req.body.startDate;
  var startTime = req.body.startTime;
  var endDate = req.body.endDate;
  var endTime = req.body.endTime;
  var type = req.body.type;
  var db = "heleo";

  queryString = "UPDATE `"+db+"`.`h_schedules` SET `deviceId` = '"+deviceId+"', `startDate` = '"+startDate+"', `startTime` = '"+startTime+"', `endDate` = '"+endDate+"', `endTime` = '"+endTime+"', `type` = '"+type+"' WHERE (`scheduleId` = '"+scheduleId+"');";
  console.log(queryString);
  pool.query(queryString, function(error, results, fields) {
    if (error) {
      res
        .status(200)
        .json({ message: "Error Inserting into schedule Table" }+ error);
        
    } else {
      res.status(200).json({ message: "Schedule Updated Successfully" });
    }
  });
});

//Delete Schedule by ID
router.delete('/delete_schedule/:id', (req, res) => {
  console.log('Schedule deleted');
  pool.query('DELETE FROM h_schedules WHERE scheduleId = ?', [req.params.id], (err, rows, fields) => {
      if (!err)
          res.send('Deleted successfully.');
      else
          console.log(err);
  })
});
//h_devices
router.get('/getdeviceinfo',(req,res)=>
{
  pool.query('SELECT * FROM h_devices',(err,rows,fields)=>{
    if (!err)
    res.send(rows);
else
    console.log(err);
  })
});

router.get('/getdevice/:id', (req, res) => {
  console.log('Schedule viewed by id');
    pool.query('SELECT * FROM h_devices WHERE deviceId =?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    }) 
});
router.post('/adddevice',(req,res)=>{
  console.log(req.body)
 var deviceId=req.body.deviceId;
  var userId=req.body.userId;
  var macAddress=req.body.macAddress;
  var ipAddress=req.body.ipAddress;
  var device_name=req.body.device_name;
  var locationId=req.body.locationId;
  var deviceStatus=req.body.deviceStatus;
  var db ="heleo"
  var queryString = `SELECT * from h_devices where deviceId = ${deviceId}`;
  console.log('new device added');
  pool.query(queryString, function(error, results, fields) {
    if (error) {
      res.status(200).json({ message: "Error Querying Database " + error});
    } else {
      if (results.length > 0) {
        res.status(200).json({ message: "device Already Exists" });
      } else {
        queryString = "INSERT INTO `h_devices`(`deviceId`,`userId`,`macAddress`,`ipAddress`,`device_name`,`locationId`,`deviceStatus`) VALUES ('"+deviceId+"','"+userId+"','"+macAddress+"','"+ipAddress+"','"+device_name+"','"+locationId+"','"+deviceStatus+"')";
        console.log(queryString);
        pool.query(queryString, function(error, results, fields) {
          if (error) {
            res
              .status(200)
              .json({ message: "Error Inserting into Device" }, error);
          } else {
            res.status(200).json({ message: "Device Added Successfully" });
          }
        });
      }
    }
  });

  //res.send('ramulo ramula')
})
router.put('/updatedevice/:id',(req,res)=>{
  console.log(req.body)
  var deviceId=req.body.deviceId;
   var userId=req.body.userId;
   var macAddress=req.body.macAddress;
   var ipAddress=req.body.ipAddress;
   var device_name=req.body.device_name;
   var locationId=req.body.locationId;
   var deviceStatus=req.body.deviceStatus;
   var db ="heleo"
   queryString = "UPDATE `"+db+"`.`h_devices` SET `userId` = '"+userId+"', `macAddress` = '"+macAddress+"', `ipAddress` = '"+ipAddress+"', `device_name` = '"+device_name+"', `locationId` = '"+locationId+"', `deviceStatus` = '"+deviceStatus+"' WHERE (`deviceId` = '"+deviceId+"');";
   console.log(queryString);
   pool.query(queryString, function(error, results, fields) {
     if (error) {
       res
         .status(200)
         .json({ message: "Error Inserting into schedule Table" }+ error);
         
     } else {
       res.status(200).json({ message: "deviceinfo Updated Successfully" });
     }
   });
 });
 // res.send('vachindhay pilla mellaga vachindhay cream biscet vesinday')
//})

module.exports = router;
