/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { slug, email } = req.body;
    try {
      const profile = await prisma.profile.findUnique({
        where: {
          slug: slug as string,
        },
      });
      if (!profile || profile.email === email) {
        res.status(200).json({ slug: 'available' });
      } else {
        res.status(204).json({ slug: 'not available' });
      }
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong', error });
    }
  }
};
