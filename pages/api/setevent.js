import prisma from '../../lib/prisma'

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const { name, description, created_by, username, date ,image} = req.body
			const date_time = new Date(date)
			const event = await prisma.events.create({
				data: {
					name,
					description,
					date_time,
					image,
					profile: {
						create: {
							email: created_by,
							name: username,
						},
					},
				},
			})
			console.log(event)
			res.status(200).json({ event })
		} catch (error) {
			console.log(error)
			res.status(400).json({ error })
		}
	} else {
		res.status(200).json({ message: 'Method not allowed' })
	}
}
