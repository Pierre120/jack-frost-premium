import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';

// create reusable transporter object using the default SMTP transport
export const transporter = nodemailer.createTransport({
	service: 'gmail', //depends on whether or not client would like to use gmail
	auth: {
		user: env.NODEMAILER_USER, //should place in .env
		pass: env.NODEMAILER_PASS //should place in .env
	}
});

export type Transporter = typeof transporter;
