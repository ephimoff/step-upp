/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    console.info(`[INFO] POST /api/profile`);
    const profileData = req.body;
    console.dir(`[INFO] POST /api/profile. [profileData]: ${profileData}`);
    try {
      const savedProfile = await prisma.profile
        .create({
          data: profileData,
        })
        .catch(async (e) => {
          console.error(`[ERROR] POST /api/profile: ${e}`);
        });
      res.status(200).json(savedProfile);
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong', error });
    }
  }
  if (req.method === 'PUT') {
    console.info(`[INFO] PUT /api/profile`);
    const { email } = req.query;
    const profile = req.body;
    // update profile
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
    const { email, query } = req.query;
    if (email) {
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
    if (query) {
      try {
        const profile = await prisma.profile.findMany({
          where: {
            name: {
              contains: query as string,
              mode: 'insensitive',
            },
          },
          select: {
            name: true,
            id: true,
            slug: true,
            team: true,
            title: true,
            email: true,
            userpic: true,
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
  }
};
