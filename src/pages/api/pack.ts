/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';
import { log } from 'next-axiom';
import prisma from '@/utils/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
  }
  if (req.method === 'POST') {
    const { id, workspaceId } = req.body;
    log.info('API POST /api/pack. Attempting to create a record');
    log.debug('API POST /api/pack. id and workspaceId', {
      id,
      workspaceId,
    });
    try {
      const pack = await prisma.packs
        .create({
          data: {
            id: id,
            workspace: { connect: { id: workspaceId } },
          },
        })
        .catch(async (e) => {
          log.error(`API POST /api/pack. Error creating the record:`, e);
        });

      res.status(200).json(pack);
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong', error });
    }
  }
};
