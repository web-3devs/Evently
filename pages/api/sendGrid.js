import mail from "@sendgrid/mail";

export default async function handler(req, res) {
    mail.setApiKey(process.env.SENDGRID_KEY);
    if (!req.method === 'POST') {
        res.status(200).json({ message: 'Method not allowed' })
        return
    }
    const { sendTo, user_name, participent_id,  event_name } = req.body;

    const QR_CODE_URI = await generateQRCode(user_name, participent_id, sendTo);

    const mailContent = `<h2>Hey <b>${user_name}</b>,</h2><br/>
		<h3>
		<b>🎉🎉 Congratulations 🥳🥳</b>s
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
    const msg = {
        to: sendTo,
        from: 'contactweb3devs@gmail.com', // Use the email address or domain you verified above
        subject: '[Web3Devs] You are in',
        text: '',
        html: mailContent,
    }

    (async () => {
        try {
          await mail.send(msg);
          rres.status(200).json({ message: 'Email Sent' })
        } catch (error) {
            res.status(400).json({ message: 'failed' })
      
          if (error.response) {
            console.error(error.response.body);
          }
        }
      })();

}
async function generateQRCode(name, participent_id, email) {
	const data = { participent_id: participent_id, name: name, email: email }
	const img = await QRCode.toDataURL(JSON.stringify(data))
	return img
}
