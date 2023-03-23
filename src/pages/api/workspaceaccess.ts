/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
  }
  if (req.method === 'PUT') {
    const { id, isActive } = req.body;
    try {
      const savedRecord = await prisma.workspaceAccess
        .update({
          where: {
            id: id,
          },
          data: {
            isActive: isActive,
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
