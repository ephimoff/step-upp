/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { appraiseeId, appraiserId, scores } = req.body;

    let isSuccess = true;
    try {
      // search for a record with the appraisal
      const records = await prisma.feedbackScores.findMany({
        where: {
          appraiserId: appraiserId,
          appraiseeProfileId: appraiseeId,
        },
      });
      if (records.length > 0) {
        // if found update the existing record
        records.map(async (record, index) => {
          const newScore = scores.find(
            (e: any) => e.skillId === record.appraiseeSkillId
          );

          const updatedScore = await prisma.feedbackScores
            .update({
              where: {
                id: record.id,
              },
              data: {
                score: newScore.score,
                date: new Date(),
              },
            })
            .catch(async (e) => {
              console.error(e);
            });
          isSuccess = updatedScore ? true : false;
        });

        res.status(200).json(isSuccess);
      } else {
        // if not found create a new record
        scores.map(async (score: any, index: number) => {
          const savedScore = await prisma.feedbackScores
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
      }
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong', error });
    }
  }
  if (req.method === 'GET') {
    const { profileId } = req.query;
    try {
      const feedbackScore = await prisma.profileScores
        .findMany({
          where: {
            profileId: profileId as string,
          },
          select: {
            skill: true,
            feedbackScores: true,
          },
        })
        .catch(async (e) => {
          console.error(e);
        });
      res.status(200).json(feedbackScore);
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong', error });
    }
  }
};
