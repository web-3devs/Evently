import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const { username, password } = req.body
			const isFound = await prisma.credintials.findMany({
				select: {
					username: true,
					password: true,
					event_id: true,
				},
				where: {
					username: username,
					password: password,
				},
			})

			if (isFound) {
				res.status(200).json({ isFound })
			} else {
				res.status(406).json({ message: 'Not allowed' })
			}
		} catch (error) {
			console.log(error)
			res.status(400).json({ error })
		}
	} else {
		res.status(200).json({ message: 'Method not allowed' })
	}
}
