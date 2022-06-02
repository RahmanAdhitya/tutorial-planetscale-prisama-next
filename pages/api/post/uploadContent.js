import prisma from '../../../lib/prisma';

export default async function uploadPost(req, res) {
  const { image_url, userId, like_count, caption } = req.body;
  if (req.method === 'POST') {
    try {
      const result = await prisma.post.create({
        data: {
          image_url,
          caption,
          like_count,
          User: {
            connect: {
              id: userId,
            },
          },
        },
      });
      if (!result) {
        return res.status(400).json({ error: 'input user error', success: false });
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
