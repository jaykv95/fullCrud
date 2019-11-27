var send_mail = function(to,message,usertoken){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rajesh.neocepts@gmail.com',
            pass: 'yourpassword'
        }
    });
  
    var mailOptions = {
        from: message,
        to: to,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };
  
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });
}