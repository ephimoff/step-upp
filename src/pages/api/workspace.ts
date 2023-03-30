/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';
import { log } from 'next-axiom';
import prisma from '@/utils/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
  }
  if (req.method === 'PUT') {
    const { id, name, description } = req.body;
    try {
      const savedRecord = await prisma.workspace
        .update({
          where: {
            id: id,
          },
          data: {
            name: name,
            description: description,
          },
        })
        .catch(async (e) => {
          log.error(`API PUT /api/workspace. Error updating the record:`, e);
        });
      res.status(200).json(savedRecord);
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong', error });
    }
  }
};
