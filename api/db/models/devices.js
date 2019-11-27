'use strict';
module.exports = (sequelize, DataTypes) => {
  const Devices = sequelize.define('Devices', {
    deviceName: DataTypes.STRING,
    macAddress: DataTypes.STRING,
    ipAddress: DataTypes.STRING,
    deviceStatus: DataTypes.BOOLEAN,
    createdAt:{
      type:DataTypes.DATE,
      defaultValue:sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt:{
      type:DataTypes.DATE,
      defaultValue:sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedBy:DataTypes.STRING,
    createdBy:DataTypes.STRING
  }, {
    hooks: {
      beforeSave: (device, fn)=> {
        //console.log(device);
        device.createdBy = 'happy11';
        device.updatedBy = 'sdff22';  
        console.log(device);
        //fn(null, device)
        
      },
      beforeUpdate:(device,fn)=>{
        //console.log(device);
        device.createdBy = 'happy';
        device.updatedBy = 'sdff';
        console.log(device);
        //fn(null, device)
      }
    },

  });
  Devices.associate = function (models) {
    // associations can be defined here
  };
  return Devices;
};