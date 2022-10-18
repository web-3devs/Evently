import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { email, name, description } = req.body;

      const user = await prisma.profile.update({
        where: {
          email,
        },
        data: {
          name,
          description,
        },
      });
      res.status(200).json({ user: user });
    } catch (error) {
      res.status(400).json({ error });
    }
  } else {
    res.status(200).json({ message: "Method not allowed" });
  }
}
