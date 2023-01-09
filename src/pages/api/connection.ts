import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { competencyId, profileId } = req.body;
    // console.log('api', { competencyId, profileId });
    try {
      const savedConnection = await prisma.profileCompetencies
        .create({
          data: {
            profile: {
              connect: { id: profileId },
            },
            competency: {
              connect: { id: competencyId },
            },
          },
        })
        .catch(async (e) => {
          console.error(e);
        });
      // console.log('api savedConnection: ', savedConnection);
      res.status(200).json(savedConnection);
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong', error });
    }
  }
};
