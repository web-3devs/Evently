import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, description, date, image, user_id } = req.body;
      const date_time = new Date(date);
      const event = await prisma.events.create({
        data: {
          name,
          description,
          date_time,
          image,
          profile: {
            connect: {
              id: user_id,
            },
          },
        },
      });
      console.log(event);
      res.status(200).json({ event });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  } else {
    res.status(200).json({ message: "Method not allowed" });
  }
}
