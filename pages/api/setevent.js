import prisma from '../../lib/prisma'

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const { name, description, user_id, date, image } = req.body
			const date_time = new Date(date)
			const event = await prisma.events.create({
				data: {
					name,
					description,
					date_time,
					image,
					profile: {
						connect: {
							id: user_id,
						},
					},
				},
			})
			res.status(200).json({ event })
		} catch (error) {
			res.status(400).json({ error })
		}
	} else {
		res.status(200).json({ message: 'Method not allowed' })
	}
}
