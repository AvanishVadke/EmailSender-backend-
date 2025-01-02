const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-email", (req, res) => {
    
    //create trasporter obeject
    let trasnporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'avanishvadke001@gmail.com',
            pass: 'xxwhcorsucjfbhtt' // to fill pass from google here
        } // can provide any server to SMTP details in here
        
    });

    // Mail options

    let mailOptions = {
        from: 'avanishvadke001@gmail.com', //sender address
        to: 'avanishvadke001@gmail.com', // list of receivers
        subject: 'Enquiry from ' + req.body.name, 
        text: "Phone: " + req.body.phone + "\n" + "Query:" + req.body.query 
    };

    //send mail

    trasnporter.sendMail(mailOptions, function(err, info){
        if(err){
            console.log('Error Occurs', err);
            return res.status(500).json(err);
        } else {
            console.log('Email sent');
            return res.status(200).json("Mail sent");
        }
    });
});

app.listen(9000, () => {console.log("listening at port 9000")});