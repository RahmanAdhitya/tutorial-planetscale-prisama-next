import prisma from '../../../../../lib/prisma';

export default async function fetchlike(req, res) {
  if (req.method === 'GET') {
    const { id, userId } = req.query;
    const parseUserId = parseInt(userId);
    const parseId = parseInt(id);
    try {
      const result = await prisma.like.findMany({
        where: {
          userId: parseUserId,
          postId: parseId,
        },
      });

      return res.status(200).json({ data: result, success: true });
    } catch (error) {
      console.error('Request error', error);
      res.status(500).json({ error: 'Error creating question', success: false });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed', success: false });
  }
}
