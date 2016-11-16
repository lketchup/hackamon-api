var nodemailer = require('nodemailer');

exports.sendSuccessEmail = function sendEmail(student, swappedIntoClass, swappedOutClass) {
    var recipientEmail = student.username;
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
        html:
        '<p>Hey, '+ student.firstname +' ' + student.lastname +', </p>' +
        '<p>ReAllocate+ has swapped you in to ' + swappedIntoClass.uuid + '</p>' +
        '<table border="1">' +
            '<tr >' +
                '<th style="padding:5px" > Allocation</th>'+'<th style="padding:5px">Unit Code</th>' + '<th style="padding:5px">Class Type</th>' + '<th style="padding:5px">Day</th>'  + '<th style="padding:5px">Time</th>' + '<th style="padding:5px">Location</th>' + '<th style="padding:5px">Duration (hours)</th>' + '<th style="padding:5px">Campus</th>' +
            '</tr>' +
            '<tr style="text-align:center" >' +
                '<td style="padding:5px;" >Old</td>'+'<td style="padding:5px;" >'+swappedOutClass.uuid+'</td>' + '<td style="padding:5px;">'+swappedOutClass.type+'</td>' + '<td style="padding:5px;" >'+swappedOutClass.day+'</td>' + '<td style="padding:5px;">'+swappedOutClass.time+'</td>' + '<td style="padding:5px;">'+swappedOutClass.location+'</td>' + '<td style="padding:5px;">'+swappedOutClass.duration+'</td>' + '<td style="padding:5px;">'+swappedOutClass.campus+'</td>' +
            '</tr>' +
            '<tr style="text-align:center" >' +
                '<td style="padding:5px;">New</td>'+'<td style="padding:5px;">'+swappedIntoClass.uuid+'</td>' + '<td style="padding:5px;">'+swappedIntoClass.type+'</td>' + '<td style="padding:5px;">'+swappedIntoClass.day+'</td>' + '<td style="padding:5px;">'+swappedIntoClass.time+'</td>' + '<td style="padding:5px;">'+swappedIntoClass.location+'</td>' + '<td style="padding:5px;">'+swappedIntoClass.duration+'</td>' + '<td style="padding:5px;">'+swappedIntoClass.campus+'</td>' +
            '</tr>' +
        '</table>' +
        '<h1 style="color:#6495ed"> ReAllocate+ </h1>'

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

