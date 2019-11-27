'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    companyName: DataTypes.STRING,
    address: DataTypes.STRING,
    owner: DataTypes.STRING,
    companyStatus: DataTypes.BOOLEAN,
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
      beforeSave: (company, fn)=> {
        //console.log(device);
        company.createdBy = company.createdBy+'user';
        company.updatedBy = 'sdff22';  
        console.log('............hoooooooooook............',company);
        //fn(null, device)
        
      },
      beforeUpdate:(company,fn)=>{
        //console.log(device);
        company.createdBy = 'happy';
        company.updatedBy = 'sdff';
        console.log(company);
        //fn(null, device)
      }
    },

  });
  Company.associate = function (models) {
    // associations can be defined here
  };
  return Company;
};