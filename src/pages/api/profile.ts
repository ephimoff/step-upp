import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const profileData = req.body;
    try {
      const savedProfile = await prisma.profile.create({
        data: profileData,
      });
      res.status(200).json(savedProfile);
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong', error });
    }
  }
  if (req.method === 'PUT') {
    const { profile, where } = req.body;
    try {
      const savedProfile = await prisma.profile.update({
        where: {
          email: where,
        },
        data: profile,
      });
      res.status(200).json(savedProfile);
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong', error });
    }
  }
  if (req.method === 'GET') {
    const { email } = req.query;
    try {
      const profile = await prisma.profile.findUnique({
        where: {
          email: email as string,
        },
      });
      if (profile) {
        res.status(200).json(profile);
      } else {
        res.status(500).json({ msg: 'Profile not found' });
      }
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong', error });
    }
  }
};
