import prisma from '../../lib/prisma'

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const { event_id, email } = req.body

			const data = await prisma.credintials.create({
				data: {
					username: email,
					password: 'ETL' + randomPassword(5),
					events: {
						connect: {
							id: event_id,
						},
					},
				},
			})
			console.log(data)
			res.status(200).json({ data })
		} catch (error) {
			console.log(error)
			res.status(400).json({ error })
		}
	} else {
		res.status(200).json({ message: 'Method not allowed' })
	}
}
function randomPassword(length) {
	var chars = 'abcdefghijklmnopqrstuvwxyz@#ABCDEFGHIJKLMNOP1234567890'
	var pass = ''
	for (var x = 0; x < length; x++) {
		var i = Math.floor(Math.random() * chars.length)
		pass += chars.charAt(i)
	}
	return pass
}
