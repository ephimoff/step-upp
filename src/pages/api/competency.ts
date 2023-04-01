/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';
import type { CompetencyType } from '@/types/types';
import { log } from 'next-axiom';
import prisma from '@/utils/prisma';

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
    const { competencyData, workspaceId } = req.body;
    let isSuccess = true;
    log.info('API POST /api/competency. Attempting to create a record');
    log.debug('API POST /api/competency. competencyData and workspaceId', {
      competencyData,
      workspaceId,
    });
    try {
      competencyData.map(async (competency: CompetencyType, index: number) => {
        log.debug('API POST /api/competency. competency', competency);
        const savedCompetency = await prisma.competency
          .create({
            data: {
              workspace: { connect: { id: workspaceId } },
              name: competency.name,
              description: competency.description,
              skills: {
                create: competency.skills,
              },
            },
          })
          .catch(async (e) => {
            log.error(
              `API POST /api/competency. Error creating the record:`,
              e
            );
          });
        isSuccess = savedCompetency ? true : false;
      });
      res.status(200).json(isSuccess);
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong', error });
    }
  }
};
