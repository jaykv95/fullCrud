var create_device = (companyName, address, owner) => {
    var sql = "INSERT INTO company (companyName,address,owner) VALUES (?,?,?)";
    return sql;
}
// var check_device_exists = (deviceName, ipAddress, macAddress) => {
//     var sql = "SELECT * from devices where deviceName='"+deviceName+"' and ipAddress = '"+ipAddress+"' and macAddress = '"+macAddress+"'";
//     return sql;
// }

var update_device = () => {
    //write the query to access data from db
}
var delete_device = () => {
    //write the query to access data from db
}

var get_device_byId = () => {
    //write the query to access data from db
}

var list_all_devices = () => {
    //write the query to access data from db
}

module.exports = {
    create_device,
    get_device_byId,
    list_all_devices,    
    delete_device,
      update_device
}