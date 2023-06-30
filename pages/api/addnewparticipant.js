import prisma from '../../lib/prisma'

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const { email, name,event_id, department,course,enrollment } = req.body
			console.log(email);
			console.log(name);
			
			const participent_data = await prisma.newparticipants.create({
				data: {
					name: name,
					email: email,
                    event_id:event_id,
                    enrollment:enrollment,
                    department:department,
                    course:course,
					events: {
						connect: {
							id: event_id,
						},
					},
				},
			})
			res.status(200).json({ participent_data })
		} catch (error) {
			console.log(error,'here')
			res.status(400).json({ error })
		}
	} else {
		res.status(200).json({ message: 'Method not allowed' })
	}
}
