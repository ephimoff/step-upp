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
    const { email, updateMembership } = req.query;
    const data = req.body;
    // update profile
    if (email) {
      try {
        const updatedProfile = await prisma.profile
          .update({
            where: {
              email: email as string,
            },
            data: data,
          })
          .catch(async (e) => {
            log.error(`API PUT /api/profile. Error updating Profile:`, e);
          });
        res.status(200).json(updatedProfile);
      } catch (error) {
        res.status(500).json({ msg: 'Something went wrong', error });
      }
    }
    if (updateMembership) {
      // console.log('updateMembership', updateMembership);
      // console.log('data', data);
      const profileId = data.profileId;
      const userId = data.userId;
      const workspaceId = data.workspaceId;
      const role = data.role;
      try {
        const updatedAccess = await prisma.profile.update({
          where: {
            id: profileId as string,
          },
          data: {
            user: {
              update: {
                membership: {
                  update: {
                    where: {
                      userId_workspaceId: { userId, workspaceId } as any,
                    },
                    data: { role: role as 'OWNER' | 'MEMBER' },
                  },
                },
              },
            },
          },
        });
        res.status(200).json(updatedAccess);
      } catch (error) {
        res.status(500).json({ msg: 'Something went wrong', error });
      }
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
            AND: [
              {
                user: {
                  membership: { some: { workspaceId: workspaceId as string } },
                },
                OR: [
                  { name: { contains: query as string, mode: 'insensitive' } },
                  { email: { contains: query as string, mode: 'insensitive' } },
                  { title: { contains: query as string, mode: 'insensitive' } },
                  { team: { contains: query as string, mode: 'insensitive' } },
                  { slug: { contains: query as string, mode: 'insensitive' } },
                ],
              },
            ],
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
