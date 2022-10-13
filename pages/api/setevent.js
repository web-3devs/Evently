import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const {
        email,
        name,
        description,
        image,
        date_time,
        created_by,
      } = req.body;

      const event = await prisma.events.create({
        data: {
          email,
          name,
          description,
          date_time,
          created_by,
          image,
        },
      });
      res.status(200).json({ event });
    } catch (error) {
      res.status(400).json({ error });
    }
  } else {
    res.status(200).json({ message: "Method not allowed" });
  }
}
