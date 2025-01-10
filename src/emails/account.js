const sgMail = require('@sendgrid/mail');


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'thaveeshayanith98@gmail.com',
        subject: 'Welcome to Task Manager!',
        text: `Hello ${name}, thank you for joining our task manager app. Let's get started!`,
        html: `<h1>Welcome ${name}, thank you for joining our task manager app.</h1><p>Let's get started!</p>`,
  
    })
}

const sendGoodbyeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'thaveeshayanith98@gmail.com',
        subject: 'Goodbye from Task Manager!',
        text: `Goodbye ${name}, we hope to see you again soon!`,
        html: `<h1>Goodbye ${name}, we hope to see you again soon!</h1>`,})
}
module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail

}