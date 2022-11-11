import prisma from '../../lib/prisma'


export default async function handler(req,res){
    if (req.method == "GET"){
        try {
            let allUsers = await prisma.profile.findMany({ });
            res.status(200).json({ users: allUsers });
        } catch (error) {
            res.status(400).json({ error })
        }
    }else{
        res.status(200).json({ message: 'Message not allowed' });
    }
}