var nodemailer = require("nodemailer");

module.exports = function (to, subject, text, html) {
    var smtpTransport = nodemailer.createTransport('smtps://ihor.ilnytskyi%40gmail.com:ihaj2016@smtp.gmail.com');

    var mail = {
        from: "VRakashy",
        to: to,
        subject: subject,
        text: text,
        html: html
    };

    smtpTransport.sendMail(mail, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response);
        }
        smtpTransport.close();
    });
};
