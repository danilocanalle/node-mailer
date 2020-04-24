const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const ExpressBrute = require('express-brute');
const fs = require('fs');

const {targets} = JSON.parse(fs.readFileSync('targets.json', 'utf8'))

// APP ----------------------------------------
const port = process.env.PORT || 3000;

let store;

if(process.env.NODE_ENV === 'development') {
  store = new ExpressBrute.MemoryStore();
} else {
  const RedisStore = require('express-brute-redis');

  store = new RedisStore({
    host: '127.0.0.1',
    port: 6379
  });
}

const bruteforce = new ExpressBrute(store, {
  freeRetries: 2,
  minWait: 1000 * 10,
  failCallback: (req, res) => {
    return res.status(401).json({status: "Too many requests."})
  }
});

const app = express();
app.use(bodyParser.json({ limit: "2mb", extended: true }));

async function sendMail(target, to, subject, html) {

  const transporter = nodemailer.createTransport({
    host: target.host,
    port: target.port,
    secure: target.secure, // true for 465, false for other ports
    auth: {
      user: target.user,
      pass: target.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"Pirulas Festas 🎂" <nao-responda@pirulasfestas.com.br>', // sender address
    to, // list of receivers, , ,
    subject, // Subject line
    // text: "Hello world?", // plain text body
    html, // html body
  });

  return info.messageId;
}

app.get("/", bruteforce.prevent, (req, res) => {
  res.json({ status: "ok" });
});

app.post("/send", async (req, res) => {
  console.log(req.body);

  const { target, to, subject, html } = req.body;

  if (!target || !to || !subject || !html) {
    return res.status(500).json({ status: "Invalid request" });
  }

  const getTarget = targets.find((t) => t.name === target);

  if (!getTarget) {
    return res.status(500).json({ status: "Invalid target" });
  }

  const mail = await sendMail(getTarget, to, subject, html);

  return res.status(200).json({ mail });
});

console.log(`Node Mailer listening port ${port}`);
app.listen(port);