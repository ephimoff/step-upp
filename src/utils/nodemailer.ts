import nodemailer from 'nodemailer';

const host = process.env.EMAIL_SERVER_HOST;
const port = process.env.EMAIL_SERVER_PORT;
const username = process.env.EMAIL_SERVER_USER;
const password = process.env.EMAIL_SERVER_PASSWORD;

var transport = nodemailer.createTransport({
  host: host,
  port: Number(port),
  auth: {
    user: username,
    pass: password,
  },
});
