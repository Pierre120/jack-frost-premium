import nodemailer from 'nodemailer';

// create reusable transporter object using the default SMTP transport
export const transporter = nodemailer.createTransport({
  service: 'gmail', //depends on whether or not client would like to use gmail
  auth: {
    user: "jackfrosttest2023@gmail.com", //should place in .env
    pass: "lpxiwiyugnjgzdnz", //should place in .env
  }
});

export type Transporter = typeof transporter;