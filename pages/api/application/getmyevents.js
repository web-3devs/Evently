import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
	if (!req.method === 'GET') {
		res.status(200).json({ message: 'Method not allowed' })
		return
	}
	try {
		const { id } = req.body
		let allevents = await prisma.events.findMany({
			select: {
				participants: true,
				created_at: true,
				date_time: true,
				description: true,
				created_by: true,
				id: true,
				image: true,
				name: true,
			},
			where: {
				created_by: id,
			},
		})
		console.log(allevents)
		res.status(200).json({ events: allevents })
	} catch (error) {
		console.log(error)
		res.status(400).json({ error })
	}
}
