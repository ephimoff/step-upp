/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';
import { log } from 'next-axiom';
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
          log.error(
            `API POST /api/assigncompetency. Error creating Profile Competency:`,
            e
          );
        });
      res.status(200).json(savedRecord);
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong', error });
    }
  }
  if (req.method === 'GET') {
    const { profileId } = req.query;
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
                description: true,
                name: true,
                skills: {
                  select: {
                    id: true,
                    name: true,
                    scores: {
                      where: { profileId: profileId as string },
                      select: {
                        profileId: true,
                        skillId: true,
                        score: true,
                        feedbackScores: {
                          select: {
                            appraiser: true,
                            date: true,
                            score: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        })
        .catch(async (e) => {
          log.error(
            `API GET /api/assigncompetency. Error finding Profile Competency:`,
            e
          );
        });
      res.status(200).json(assignedCompetencies);
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong', error });
    }
  }
};
