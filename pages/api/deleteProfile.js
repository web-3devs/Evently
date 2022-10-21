import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      const { user_id } = req.body;

      const deletedUser = await prisma.profile.delete({
        where: {
          id: user_id,
        },
      });
      res.status(200).json({ user: deletedUser });
    } catch (error) {
      res.status(400).json({ error });
    }
  } else {
    res.status(200).json({ message: "Method not allowed" });
  }
}
