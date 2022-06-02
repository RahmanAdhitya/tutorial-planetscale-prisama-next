import prisma from '../../../../../lib/prisma';

export default async function likeContent(req, res) {
  const { id, userId } = req.query;
  const parseUserId = parseInt(userId);
  const parseId = parseInt(id);
  if (req.method === 'POST') {
    try {
      const result = await prisma.like.create({
        data: {
          User: {
            connect: {
              id: parseUserId,
            },
          },
          Post: {
            connect: {
              id: parseId,
            },
          },
        },
      });

      const addedLike = await prisma.post.update({
        where: {
          id: parseId,
        },
        data: {
          like_count: {
            increment: 1,
          },
        },
      });
      if (!result || !addedLike) {
        return res.status(400).json({ error: 'error like post', success: false });
      }
      return res.status(200).json({ data: result, addedLike, success: true });
    } catch (error) {
      console.error('Request error', error);
      res.status(500).json({ error: 'Error creating question', success: false });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed', success: false });
  }
}
