/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';
import { log } from 'next-axiom';
import { searchPerPage } from '@/data/data';
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
    const { email, updateOwnership } = req.query;
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
    if (updateOwnership) {
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
    const { email, query, workspaceId, page } = req.query;
    console.log('page', page);

    log.info(`API GET /api/profile`);

    if (email) {
      log.info(`API PUT /api/profile. Searching by email`);
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
    if ((query && workspaceId) || page) {
      // const PER_PAGE = 1;
      const currentPage = Math.max(Number(page) || 1, 1);
      const skip = (currentPage - 1) * searchPerPage;
      // console.log('skip', skip);
      log.info(`API PUT /api/profile. Searching by query`);
      log.debug(
        `API PUT /api/profile. Searching by query:`,
        query as { [key: string]: any }
      );
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
            user: {
              select: {
                id: true,
                membership: { select: { role: true, workspaceId: true } },
              },
            },
          },
          orderBy: { name: 'asc' },
          take: searchPerPage,
          skip: skip,
        });
        console.log('searchResults', searchResults);
        const count = await prisma.profile.count({
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
        });
        log.debug(`API PUT /api/profile. Search results: `, searchResults);
        if (searchResults) {
          res.status(200).json({ searchResults, count });
        } else {
          res.status(500).json({ msg: 'Profile not found' });
        }
      } catch (error) {
        res.status(500).json({ msg: 'Something went wrong', error });
      }
    }
  }
};
