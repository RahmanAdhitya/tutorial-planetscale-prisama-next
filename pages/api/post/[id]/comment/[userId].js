import prisma from '../../../../../lib/prisma';

export default async function commentContent(req, res) {
  const { content } = req.body;
  const { id, userId } = req.query;
  const parseUserId = parseInt(userId);
  const parseId = parseInt(id);
  if (req.method === 'POST') {
    try {
      const result = await prisma.comment.create({
        data: {
          content,
          Post: {
            connect: {
              id: parseId,
            },
          },
          User: {
            connect: {
              id: parseUserId,
            },
          },
        },
        include: {
          User: {
            select: {
              username: true,
              full_name: true,
            },
          },
        },
      });

      if (!result) {
        return res.status(400).json({ error: 'error input comment', success: false });
      }
      return res.status(200).json({ data: result, success: true });
    } catch (error) {
      console.error('Request error', error);
      res.status(500).json({ error: 'Error creating question', success: false });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed', success: false });
  }
}
