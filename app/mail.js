import sgMail from '@sendgrid/mail';
import {makeResetToken} from './db';

// add params for recipient
export const sendEmail = async (email) => {
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	const tokenString = await makeResetToken(email);

	const msg = {
		to: email, // Change to your recipient
		from: 'dishdelishapp@gmail.com', // Change to your verified sender
		subject: 'Password Reset Request',
		text: 'Reset your password at this link',
		html: `<a href='http://localhost:3000/reset-password/${tokenString}'>Reset your password at this link</a>`,
	};

	sgMail
		.send(msg)
		.then(() => {
			console.log('Email sent');
		})
		.catch((error) => {
			console.error(error);
		});
};
