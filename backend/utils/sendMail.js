import nodemailer from 'nodemailer';
import { config } from "dotenv";

config({ path: "./config/config.env" });

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: "anoopshetty8103@gmail.com",
    pass: process.env.MAIL_PASSWORD,
  },
});

export async function sendMail(to, subject, text) {
  try {
    const info = await transporter.sendMail({
      from: 'anoopshetty8103@gmail.com',
      to, 
      subject, 
      text 
    });
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}