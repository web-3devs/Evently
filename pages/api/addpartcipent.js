import prisma from '../../lib/prisma'

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const { email, name, event_id } = req.body
			const alreadyRegsitered = await prisma.participants.findMany({
				select: {
					email: true,
				},
				where: {
					event_id: event_id,
				},
			})
			if (alreadyRegsitered.length === 1) {
				res.status(406).json({ message: 'You already registered' })
				return
			}
			console.log('hio')
			await prisma.participants.create({
				data: {
					name: name,
					email: email,
					event_id: event_id,
				},
			})
			res.status(200).json({})
		} catch (error) {
			console.log(error)
			res.status(400).json({ error })
		}
	} else {
		res.status(200).json({ message: 'Method not allowed' })
	}
}
