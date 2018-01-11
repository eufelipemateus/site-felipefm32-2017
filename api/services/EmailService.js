var nodemailer = require('nodemailer');

var opts = {
    
		host: "br542.hostgator.com.br",
        port: 587,
        secure: true,
        auth: {
            user: "noreply@fm32.com.br",
            pass: "6LB*l4SaR%^X6.ak#*"
        },
        logger: false,
        debug: false // include SMTP traffic in the logs
};
	



var transporter = nodemailer.createTransport(opts);

exports.sendEmail = function (options) {
//  console.log('=================================\n')
    console.log('to ', options.from,options.to)
    // from always uses opts auth user
    var mailOptions = {
        from: options.from,
        sender: options.from,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html
        //  replyTo:options.replyTo,
        //  attachments: options.attachments
    };
    transporter.sendMail(mailOptions, function (error) {
        if (error) {
            console.log('Error occured');
            console.log(error.message);
            return;
        }
        console.log('Message sent successfully!');
    });

};