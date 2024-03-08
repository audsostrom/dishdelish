import sgMail from '@sendgrid/mail';

// add params for recipient
export const sendEmail = async () => {
   console.log('boo')
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
   to: 'audsostrom@gmail.com', // Change to your recipient
   from: 'dishdelishapp@gmail.com', // Change to your verified sender
   subject: 'Sending with SendGrid is Fun',
   text: 'and easy to do anywhere, even with Node.js',
   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
 }

 sgMail
 .send(msg)
 .then(() => {
   console.log('Email sent')
 })
 .catch((error) => {
   console.error(error)
 })
};