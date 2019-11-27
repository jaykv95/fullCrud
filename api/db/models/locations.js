'use strict';
module.exports = (sequelize, DataTypes) => {
  const Locations = sequelize.define('Locations', {
    locationName: DataTypes.STRING,
    createdAt: {
      type:DataTypes.DATE,
      defaultValue:sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type:DataTypes.DATE,
      defaultValue:sequelize.literal('CURRENT_TIMESTAMP')
    }
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
  Locations.associate = function (models) {
    // associations can be defined here
  };
  return Locations;
};