var nodemailer = require('nodemailer');

exports.sendSuccessEmail = function sendEmail(recipientEmail, swappedIntoClass) {
    var authData = require('./mailer_config.json');
    var transporter = nodemailer.createTransport(
        {service: 'Gmail', auth: {user: authData.username, pass: authData.password}}
    );

    var mailOptions = {
        from: authData.username,                                                     // sender address
        to: recipientEmail,
        subject: 'ReAllocate: Swap (no reply)',                                      // Subject line
        text: 'ReAllocate has swapped you into ' + swappedIntoClass.unitCode +
        ' ' + swappedIntoClass.type + ' at ' + swappedIntoClass.time +
        ', ' + swappedIntoClass.location,
        html: '<h1 style="color:#6495ed"> ReAllocate+ </h1>' +
        '<p>has swapped you into ' + swappedIntoClass.unitCode + ' ' + swappedIntoClass.type + ' at ' + swappedIntoClass.time + ' ' + swappedIntoClass.location + '</p>'

        //html:


    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("Message error: " + error);
            console.log(authData);

        } else {
            console.log('Message sent: ' + info.response);

        }

    });
};

