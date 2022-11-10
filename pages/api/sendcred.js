import nodemailer from 'nodemailer'
import QRCode from 'qrcode'
export default async function handler(req, res) {
	if (!req.method === 'POST') {
		res.status(200).json({ message: 'Method not allowed' })
		return
	}
	const { sendTo, user_name, event_name, pass } = req.body

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.MAIL_ID,
			pass: process.env.MAIL_PASSWORD,
		},
	})

	const EMAIL_TEMPLATE = `<h2>Hey <b>${user_name}</b>,</h2><br/>
		<h3>
		<b>🎉🎉 Your Event ${event_name} has been created</b>
		<p>Here's is your credentials for check-in of partipents</p>
        <p>Follow this to check in</p>
        <ul>
        <li>Download Evently App</li>
        <li>Login with below credentials
            <div>
            username:${sendTo}<br/>
            password:${pass}
            </div>
        </li>
        <li>You will be presented with your event detail</li>
        <li>Start check-in</li>
        </ul>
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
		subject: `[Evently] `,
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
