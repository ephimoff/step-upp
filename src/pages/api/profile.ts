import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const profileData = req.body;
    // console.log('POST');
    // console.log(profileData);
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
    const { email } = req.query;
    const profile = req.body;
    // console.log('PUT');
    // console.log(email);
    // console.log(req.body);
    try {
      const updatedProfile = await prisma.profile.update({
        where: {
          email: email as string,
        },
        data: profile,
      });
      res.status(200).json(updatedProfile);
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
      // console.log('api');
      // console.log(profile);
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
