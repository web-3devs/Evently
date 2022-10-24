import prisma from '../../lib/prisma'

export default async function handler(req, res) {
	if (req.method === 'GET') {
		try {
			await prisma.$connect();
			let allevents = await prisma.events.findMany({
				select: {
					participants:true,
					created_at: true,
					date_time: true,
					description: true,
					id: true,
					created_by: true,
					image: true,
					name: true,
				},
				
			})
			res.status(200).json({ events: allevents })
			prisma.$disconnect()
		} catch (error) {
			res.status(400).json({ error })
		}
	} else {
		res.status(200).json({ message: 'Method not allowed' })
	}
}
