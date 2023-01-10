import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { competencyId, profileId } = req.body;
    // console.log('api', { competencyId, profileId });
    try {
      const savedRecord = await prisma.profileCompetencies
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
      // console.log('api savedRecord: ', savedRecord);
      res.status(200).json(savedRecord);
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong', error });
    }
  }
};
