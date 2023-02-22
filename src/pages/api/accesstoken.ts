import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import prisma from '@/utils/prisma';
// import { CompetencyType } from '@/types/types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong', error });
    }
  }
  if (req.method === 'POST') {
    const { email } = req.body;
    const week = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days from Today
    const token = uuidv4();

    try {
      const savedRecord = await prisma.feedbackAccessToken
        .create({
          data: {
            identifier: email,
            token: token,
            expires: new Date(week),
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
