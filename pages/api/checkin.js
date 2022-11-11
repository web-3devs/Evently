import prisma from '../../lib/prisma'

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const { username, password } = req.body
			const isFound = await prisma.credintials.findMany({
				select: {
					username: true,
					password: true,
					event_id: true,
					events: true,
				},
				where: {
					username: username,
					password,
				},
			})
			const event_id = isFound[0].event_id
			if (isFound) {
				const event_data = await prisma.events.findMany({
					select: {
						participants: true,
					},
					where: {
						id: event_id,
					},
				})
				res.status(200).json({ isFound, event_data })
			} else {
				res.status(406).json({ message: 'Not allowed' })
			}
		} catch (error) {
			console.log(error)
			res.status(400).json({ error: error })
		}
	} else {
		res.status(200).json({ message: 'Method not allowed' })
	}
}
