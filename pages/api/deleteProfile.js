import prisma from "../../lib/prisma";

export default async function handler(req,res){
    if (req.method == "DELETE" ){
        try {
            const { user_id } = req.body;

            const user = prisma.profile.delete({
                where: {
                    id: user_id,
                },
            })
            console.log(user);
            res.status(200).json({ user: user });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error });
        } 
    }
    else{
        res.status(200).json({ message: "Method not allowed" });  
    }
}