import nodemailer from "nodemailer";
import QRCode from "qrcode";
export default async function handler(req, res) {
  if (!req.method === "POST") {
    res.status(200).json({ message: "Method not allowed" });
    return;
  }
  const { sendTo, event_name, user_name } = req.body;

  console.log(sendTo + "send mail");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  let img = await getQRCode(user_name, sendTo);
  const mailOptions = {
    from: '"Web3Devs" <contactweb3devs@gmail.com>',
    to: sendTo,
    subject: `Your seat is confirmed for ${event_name}`,
    template: "email",
    attachDataUrls: true,
    html: `<h3>Hey ${user_name},</h3><br/>
		<h2>
		Your seat is reserverd for ${event_name},
		Here is your unique QR code for check-in purpose.<br/>
		<img src='${img}'/>
		<br/>
		For the check-in,you need to show this QR at the venue
		<br/>
		</h2>
        `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(400).json({ message: "failed" });
      return console.log(error);
    }
    console.log("Message sent: " + info.response);
    res.status(200).json({ message: "Email Sent" });
  });
}

async function getQRCode(name, email) {
  console.log("in qr");
  const data = {
    name: name,
    email: email,
  };
  let img = await QRCode.toDataURL(JSON.stringify(data));
  return img;
}
