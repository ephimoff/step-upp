/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/prisma';
import { CompetencyType } from '@/types/types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const competencies = await prisma.competency.findMany({
        include: {
          skills: {
            select: {
              name: true,
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
  if (req.method === 'POST') {
    const competencyData = req.body;
    let isSuccess = true;
    try {
      competencyData.map(async (competency: CompetencyType, index: number) => {
        const savedCompetency = await prisma.competency.create({
          data: {
            name: competency.name,
            skills: {
              create: competency.skills,
            },
          },
        });
        isSuccess = savedCompetency ? true : false;
      });
      res.status(200).json(isSuccess);
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong', error });
    }
  }
};
