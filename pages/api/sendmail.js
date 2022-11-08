import nodemailer from 'nodemailer'
import QRCode from 'qrcode'
export default async function handler(req, res) {
	if (!req.method === 'POST') {
		res.status(200).json({ message: 'Method not allowed' })
		return
	}
	const { sendTo, participent_id, user_name } = req.body

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.MAIL_ID,
			pass: process.env.MAIL_PASSWORD,
		},
	})

	const QR_CODE_URI = await generateQRCode(user_name, participent_id)

	const EMAIL_TEMPLATE = `<h2>Hey <b>${user_name}</b>,</h2><br/>
		<h3>
		<b>🎉🎉 Congratulations 🥳🥳</b>
		Your seat is reserverd for ${event_name},<br/>
		Here is your unique QR code for check-in purpose.<br/>
		<div style='width:100%,display:flex,justify-content:center,align-items:center'>
		<img src='${QR_CODE_URI}'/>
		</div>
		<br/>
		For the check-in,you need to show this QR at the venue
		<pre>
		Regards,
		Team Web3Devs
		</pre>
		<h6>If you have any queries you can contact us : <a href="mailto:contactweb3devs@gmail.com">Here</a></h6>
		</h3>
        `

	const mailOptions = {
		from: '"Web3Devs" <contactweb3devs@gmail.com>',
		to: sendTo,
		subject: `[Web3Devs] You are in`,
		template: 'email',
		attachDataUrls: true,
		html: EMAIL_TEMPLATE,
	}

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			res.status(400).json({ message: 'failed' })
			return console.log(error)
		}
		console.log('Message sent: ' + info.response)
		res.status(200).json({ message: 'Email Sent' })
	})
}

async function generateQRCode(name, participent_id) {
	const data = { participent_id: participent_id, name: name }
	const img = await QRCode.toDataURL(JSON.stringify(data))
	return img
}
