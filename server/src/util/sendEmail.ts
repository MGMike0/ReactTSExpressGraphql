import nodemailer from "nodemailer";

export async function sendEmail(to: string, html: string) {
  // let testAccount = await nodemailer.createTestAccount();
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'ejxjnpn5rwhgtuvr@ethereal.email',//testAccount.user, // generated ethereal user
      pass: 'e3K1YmRHBYjvUJpxvu'//testAccount.pass, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to,
    subject: "Change Password",
    html,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
