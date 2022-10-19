import prisma from '../../lib/prisma'

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const { email, name, event_id } = req.body
			const alreadyRegsitered = await prisma.participants.findUnique({
				where: { email: email, event_id: event_id },
			})
			if (alreadyRegsitered) {
				res.status(403).json({ message: 'You already registered' })	
				return
			}
			await prisma.participants.create({
				data: {
					email: email,
					event_id: event_id,
					name: name,
				},
				
			})
			res.status(200).json({})
		} catch (error) {
			res.status(400).json({ error })
		}
	} else {
		res.status(200).json({ message: 'Method not allowed' })
	}
}
