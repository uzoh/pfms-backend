import sgMail from "@sendgrid/mail";
import Mailgen from "mailgen";
import { config } from "dotenv";

config();

const url = process.env.BASE_URL || "localhost:3000";
const projectName = process.env.PROJECT_NAME || "PFMS";
const projectEmail = process.env.PROJECT_EMAIL || "info@pfms.com";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Configure the mail gen
const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: projectName,
    link: url
  }
});

const sendMail = ({ to, subject, message }) => {
  const mailOptions = {
    from: `${projectName} <${projectEmail}>`,
    to,
    subject,
    html: message
  };

  sgMail.send(mailOptions);
};

const sendClearanceReceived = (email, name) => {
  const emailBody = {
    body: {
      name,
      title: `<h1 style="text-align: center; color: #000000"> ${projectName} </h1>`,
      intro: `Hello <b>${name.toUpperCase()}</b>,\n\nYour clearance application has been received. We will get back to you on the status of the clearance.`,
      outro: `If this email was not meant for you, please ignore.`
    }
  };

  const message = mailGenerator.generate(emailBody);
  return sendMail({
    to: email,
    subject: `${projectName}: Clearance Application`,
    message
  });
};

const sendClearanceStatus = (email, name, status) => {
  const emailBody = {
    body: {
      name,
      title: `<h1 style="text-align: center; color: #000000"> ${projectName} </h1>`,
      intro: `Hello <b>${name.toUpperCase()}</b>,\n\nYour clearance application has been <b>${status}</b>. ${status ===
        "Declined" &&
        "Please take a picture of yourself with today's newspaper for verification."}`,
      outro: `If this email was not meant for you, please ignore.`
    }
  };

  const message = mailGenerator.generate(emailBody);
  return sendMail({
    to: email,
    subject: `${projectName}: Clearance ${status}`,
    message
  });
};

export { sendClearanceReceived, sendClearanceStatus };
