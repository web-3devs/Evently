import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email, name, image } = req.body;

      const alreadyuser = await prisma.profile.findFirst({
        where: {
          email: email,
        },
      });

      if (!alreadyuser) {
        const user = await prisma.profile.create({
          data: {
            email,
            name,
            image,
          },
        });
        res.status(200).json({ user: user });
      }
      res.status(200).json({ user: alreadyuser });
    } catch (error) {
      res.status(400).json({ error });
    }
  } else {
    res.status(200).json({ message: "Method not allowed" });
  }
}
