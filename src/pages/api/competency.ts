import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const competencies = await prisma.competency.findMany({
        include: {
          skills: {
            select: {
              name: true,
              score: true,
              score360: true,
            },
          },
        },
      });
      if (competencies) {
        res.status(200).json(competencies);
      } else {
        res.status(500).json({ msg: 'No competencies were found' });
      }
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong', error });
    }
  }
};
