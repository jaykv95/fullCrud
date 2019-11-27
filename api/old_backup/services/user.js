var save_user = function(con,useremail,userphone,username,password,usertoken,callback){
    var sql = "INSERT INTO h_users (name,email,password,mobileNumber) VALUES ('"+username+"','"+useremail+"','"+password+"','"+userphone+"')";  
    con.query(sql, function (err, result) {
        if (err) {
            return callback(err,null);  
        }else{
            return callback(null,result);
        }
    });
}
var getUserByUsername = function(con,useremail,usertoken,callback){
    var usercheck = "SELECT * from h_users where email = '"+useremail+"'";
    console.log(usercheck)
    con.query(usercheck, function (err, result) {
        if (err) {
             return callback(err,null);  
        }else{
             return callback(null,result);
        }
    });
}
var user_login = function (con,username,password,usertoken,callback){
    var sql = "SELECT * from h_users where email='"+username+"' and password = '"+password+"'";
    con.query(sql, function (err, result) {
        if (err) {
             return callback(err,null);  
        }else{
             return callback(null,result)
        }
    });
}

var forgot_password = function (con,useremail,usertoken,callback){
    var resetcode_code = random_number(8);
    var current_date = get_current_date_time();
    var sql = "INSERT INTO h_resetcode (resetcode_user_email,resetcode_code,resetcode_createddate,resetcode_status) VALUES ('"+useremail+"','"+resetcode_code+"','"+current_date+"','1')";  
    con.query(sql, function (err, result) {
        if (err) {
             return callback(err,null);  
        }else{
            return callback(null,resetcode_code)
        }
    });
}
var password_reset_code_check = function (con,useremail,resetcode,usertoken,callback){
    var sql = "SELECT * from h_resetcode where resetcode_user_email='"+useremail+"' and resetcode_code = '"+resetcode+"'";
    con.query(sql, function (err, result) {  
        if (err) {
            return callback(err,null);  
       }else{
           return callback(null,result);
       }
    }); 
    
}
var user_changepassword = function(con,useremail,newpassword,usertoken,callback){
    var sql = "update  h_users set password ='"+newpassword+"' where email='"+useremail+"'";
    con.query(sql, function (err, result) {  
        if (err) {
            return callback(err,null);  
       }else{
           return callback(null,result);
       }
    }); 
}
function get_current_date_time(){
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    //console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
    var current_date = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    return current_date;
}
function random_number(length){
    var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
module.exports = {
    save_user,
    user_login,
    password_reset_code_check,
    forgot_password,
    user_changepassword,
    getUserByUsername
}