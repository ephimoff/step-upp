import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { profileId, skillId } = req.body;
    try {
      const savedRecord = await prisma.profileScores
        .create({
          data: {
            profile: { connect: { id: profileId } },
            skill: { connect: { id: skillId } },
          },
        })
        .catch(async (e) => {
          console.error(e);
        });
      res.status(200).json(savedRecord);
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong', error });
    }
  }
  if (req.method === 'PUT') {
    const { profileId, skillId, score } = req.body;
    try {
      const savedRecord = await prisma.profileScores
        .updateMany({
          where: {
            profileId: profileId,
            skillId: skillId,
          },
          data: {
            score: score,
          },
        })
        .catch(async (e) => {
          console.error(e);
        });
      res.status(200).json(savedRecord);
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong', error });
    }
  }
};
