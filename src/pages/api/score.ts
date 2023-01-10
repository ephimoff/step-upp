import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { profileId, skillId } = req.body;
    console.log('api', { profileId, skillId });
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

      // const savedRecord = await prisma.profile
      //   .update({
      //     where: {
      //       id: profileId
      //     },
      //     data: {
      //       skills: {
      //         connectOrCreate
      //       }
      //     }
      //   })
      //   .catch(async (e) => {
      //     console.error(e);
      //   });
      // console.log('api savedRecord: ', savedRecord);
      res.status(200).json(savedRecord);
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong', error });
    }
  }
};
