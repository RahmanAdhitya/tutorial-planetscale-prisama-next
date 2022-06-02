import prisma from '../../../../../lib/prisma';

export default async function fetchComment(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;
    const parseId = parseInt(id);
    try {
      const result = await prisma.comment.findMany({
        where: {
          postId: parseId,
        },
        include: {
          User: {
            select: {
              username: true,
            },
          },
        },
      });
      if (!result) {
        return res.status(400).json({ error: 'error fetching', success: false });
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
