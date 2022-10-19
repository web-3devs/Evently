import prisma from '../../lib/prisma'

export default async function handler(req, res) {
	if (req.method === 'GET') {
		try {
			let allevents = await prisma.events.findMany({})
			res.status(200).json({ events: allevents })
		} catch (error) {
			console.log(error);
			res.status(400).json({ error })
		}
	} else {
		res.status(200).json({ message: 'Method not allowed' })
	}
}
