import nodemailer from 'nodemailer';

// create reusable transporter object using the default SMTP transport
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "jackfrosttest2023@gmail.com", // generated ethereal user
    pass: "tubiafywyujmqixz", // generated ethereal password
  }
});

export type Transporter = typeof transporter;