import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log("API KEY", process.env.SENDGRID_API_KEY);
console.log("EMAIL", process.env.SENDER_EMAIL);

export const sendRegistrationEMail = async (recipientAddress) => {
  const msg = {
    to: recipientAddress,
    from: process.env.SENDER_EMAIL,
    subject: "Registration Confirmation",
    text: "Thank you for registering!",
    html: "<strong>Thank you for registering!</strong>",
  };
  await sgMail.send(msg);
};
