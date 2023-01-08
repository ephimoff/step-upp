import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const connectionData = req.body;
    try {
      const savedConnection = await prisma.connection.create({
        data: connectionData,
      });
      res.status(200).json(savedConnection);
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong', error });
    }
  }
};
