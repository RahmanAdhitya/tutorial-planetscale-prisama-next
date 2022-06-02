import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return await createUser(req, res);
  } else {
    return res.status(405).json({ message: 'Method not allowed', success: false });
  }
}

async function createUser(req, res) {
  const { password, username, email, full_name } = req.body;
  console.log(req.body);
  console.log(req.method);
  try {
    const newEntry = await prisma.user.create({
      data: {
        username,
        full_name,
        password,
        email,
      },
    });
    return res.status(200).json(newEntry, { success: true });
  } catch (error) {
    console.error('Request error', error);
    res.status(500).json({ error: 'Error creating question', success: false });
  }
}
