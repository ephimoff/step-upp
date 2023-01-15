import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { competencyId, profileId } = req.body;
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
      res.status(200).json(savedRecord);
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong', error });
    }
  }
  if (req.method === 'GET') {
    const { profileId } = req.query;
    // console.log('api', req.body);
    try {
      const assignedCompetencies = await prisma.profileCompetencies
        .findMany({
          where: {
            profileId: profileId as string,
          },
          select: {
            competency: {
              select: {
                id: true,
                name: true,
                skills: {
                  select: {
                    id: true,
                    name: true,
                    scores: { where: { profileId: profileId as string } },
                  },
                },
              },
            },
          },
        })
        .catch(async (e) => {
          console.error(e);
        });
      res.status(200).json(assignedCompetencies);
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong', error });
    }
  }
};
