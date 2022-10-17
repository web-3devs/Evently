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
      console.log(user);
      res.status(200).json({ user: user });
    } catch (error) {
      console.log(error)
      res.status(400).json({ error });
    }
  } else {
    res.status(200).json({ message: "Method not allowed" });
  }
}
