/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';
import { log } from 'next-axiom';
import prisma from '@/utils/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    log.info(`API POST /api/profile`);
    const profileData = req.body;
    log.info(`API POST /api/profile. [profileData]:`, profileData);
    try {
      const savedProfile = await prisma.profile
        .create({
          data: profileData,
        })
        .catch(async (e) => {
          log.error(`API POST /api/profile:`, e);
        });
      res.status(200).json(savedProfile);
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong', error });
    }
  }
  if (req.method === 'PUT') {
    log.info(`API PUT /api/profile`);
    const { email } = req.query;
    const profile = req.body;
    // update profile
    try {
      const updatedProfile = await prisma.profile
        .update({
          where: {
            email: email as string,
          },
          data: profile,
        })
        .catch(async (e) => {
          log.error(`API PUT /api/profile. Error updating Profile:`, e);
        });
      res.status(200).json(updatedProfile);
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong', error });
    }
  }
  if (req.method === 'GET') {
    const { email, query, workspaceId } = req.query;

    if (email) {
      try {
        const profile = await prisma.profile
          .findUnique({
            where: {
              email: email as string,
            },
          })
          .catch(async (e) => {
            log.error(`API GET /api/profile:`, e);
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
    if (query && workspaceId) {
      try {
        let searchResults = await prisma.profile.findMany({
          where: {
            user: {
              membership: { some: { workspaceId: workspaceId as string } },
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
          orderBy: { name: 'asc' },
          take: 10,
        });
        if (searchResults) {
          res.status(200).json(searchResults);
        } else {
          res.status(500).json({ msg: 'Profile not found' });
        }
      } catch (error) {
        res.status(500).json({ msg: 'Something went wrong', error });
      }
    }
  }
};
