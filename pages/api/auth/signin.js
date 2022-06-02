import prisma from '../../../lib/prisma';

export default async function signinUser(req, res) {
  const { password, email } = req.body;
  console.log(req.body);
  if (req.method === 'POST') {
    try {
      const result = await prisma.user.findFirst({
        where: {
          OR: [{ email: email }, { username: email }],
          password,
        },
      });
      if (!result) {
        return res.status(400).json({ error: 'email or password not match', success: false });
      }
      delete result.password;
      return res.status(200).json({ data: result, success: true });
    } catch (error) {
      console.error('Request error', error);
      res.status(500).json({ error: 'Network Error', success: false });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed', success: false });
  }
}
