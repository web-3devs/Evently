import nodemailer from 'nodemailer'
export default async function handler(req, res) {
	if (!req.method === 'POST') {
		res.status(200).json({ message: 'Method not allowed' })
		return
	}
	const { sendTo, image, event_name, user_name } = req.body

    console.log(sendTo+"send mail");

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.MAIL_ID,
			pass: process.env.MAIL_PASSWORD,
		},
	})

	const mailOptions = {
		from: '"Web3Devs" <contactweb3devs@gmail.com>',
		to: sendTo,
		subject: `Your seat is confirmed for ${event_name}`,
		template: 'email',
		html: `<h3>Hey ${user_name},</h3><br/>
            Your seat is reserverd for ${event_name},
            Here is your unique QR code for check-in purpose.
            <img src=${image} height="80" width="80"/>
            <br/>
            For the check-in,you need to show this QR
            <br/>

        `,
	}

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
            res.status(400).json({message:"failed"})
            return console.log(error)
		}
        console.log('Message sent: ' + info.response)
        res.status(200).json({message:"Email Sent"})
	})
}
