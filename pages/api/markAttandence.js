import prisma from '../../lib/prisma'

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const { participent_id } = req.body
			const alreadyCheckedIn = await prisma.participants.findMany({
				select: {
					isAttended: true,
				},
				where: {
					id: participent_id,
				},
			})
			if (alreadyCheckedIn && alreadyCheckedIn[0].isAttended) {
				res.status(406).json({ message: 'You already registered' })
				return
			}

			const user = await prisma.participants.update({
				where: {
					id: participent_id,
				},
				data: {
					isAttended: true,
				},
			})
			res.status(200).json({ user })
		} catch (error) {
			console.log(error)
			res.status(400).json({ error })
		}
	} else {
		res.status(200).json({ message: 'Method not allowed' })
	}
}
