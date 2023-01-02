import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const profileData = req.body;
    console.log('*** profileData:');
    console.log(profileData);

    try {
      const savedProfile = await prisma.profile.create({
        data: profileData,
      });
      res.status(200).json(savedProfile);
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong', error });
    }
  }
};
