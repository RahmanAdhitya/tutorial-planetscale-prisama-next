import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return await fetchPost(req, res);
  } else {
    return res.status(405).json({ message: 'Method not allowed', success: false });
  }
}

async function fetchPost(req, res) {
  try {
    const result = await prisma.post.findMany({
      include: {
        User: {
          select: {
            username: true,
            full_name: true,
            picture_url: true,
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
}
