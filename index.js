const express = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

app.use(express.json());
app.use(express.static('public')); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/subscribe', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'subscribe.html'));
});

app.post('/add-email', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send({ message: "Email is required" });
    }

    const filePath = path.join(__dirname, 'public', 'email.txt');

    fs.appendFile(filePath, email + '\n', (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).send({ message: "Failed to write to file", err });
        }
        res.send({ message: "Email added to file" });
    });
});

app.listen(3001, () => console.log("Server running on port 3001"));

app.get('/send-mail', async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        });

        const info = await transporter.sendMail({
            from: `"Tejas" <${process.env.EMAIL}>`, 
            to: "@gmail.com", 
            subject: "Hello Testing in progress.", 
            text: "working for notification feature", 
            html: "<b>Hello world?</b>"
        });

        console.log("Message sent: %s", info.messageId);
        res.send({ message: "Email sent", info });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send({ message: "Failed to send email", error });
    }
});
