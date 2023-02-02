import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { appraiseeId, appraiserId, scores } = req.body;
    console.log(scores);
    let isSuccess = true;
    try {
      scores.map(async (score: any, index: number) => {
        // const savedScore = await prisma.profileScores
        //   .updateMany({
        //     where: {
        //       profileId: appraiseeId,
        //       skillId: score.skillId
        //     },
        //     data: {

        //     }
        //   })
        const savedScore = await prisma.threeSixtyScores
          .create({
            data: {
              score: score.score,
              appraisee: {
                connect: {
                  profileId_skillId: {
                    profileId: appraiseeId,
                    skillId: score.skillId,
                  },
                },
              },
              appraiser: {
                connect: {
                  id: appraiserId,
                },
              },
            },
          })
          .catch(async (e) => {
            console.error(e);
          });
        isSuccess = savedScore ? true : false;
      });
      res.status(200).json(isSuccess);
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong', error });
    }
  }
};
