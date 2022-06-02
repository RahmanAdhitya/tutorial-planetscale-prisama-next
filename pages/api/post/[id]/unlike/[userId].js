import prisma from '../../../../../lib/prisma';

export default async function unLikeContent(req, res) {
  const { id, userId } = req.query;
  const parseUserId = parseInt(userId);
  const parseId = parseInt(id);
  if (req.method === 'DELETE') {
    try {
      const result = await prisma.like.deleteMany({
        where: {
          postId: parseId,
          userId: parseUserId,
        },
      });

      const leastLike = await prisma.post.update({
        where: {
          id: parseId,
        },
        data: {
          like_count: {
            increment: -1,
          },
        },
      });
      if (!result || !leastLike) {
        return res.status(400).json({ error: 'error unlike post', success: false });
      }
      return res.status(200).json({ data: [result, leastLike], success: true });
    } catch (error) {
      console.error('Request error', error);
      res.status(500).json({ error: 'Error creating question', success: false });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed', success: false });
  }
}
