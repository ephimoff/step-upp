/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { log } from 'next-axiom';
import { transporter, mailOptions } from '@/utils/nodemailer';
import prisma from '@/utils/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong', error });
    }
  }
  if (req.method === 'POST') {
    log.info(`API POST /api/accesstoken`);
    const { email, requestorName, requestorEmail, slug } = req.body;
    const week = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days from Today
    const token = uuidv4();
    const subject = 'Your colleague is requesting their evaluation';
    const domain = process.env.NEXTAUTH_URL;
    const html = `<h1>Please help your colleague with your feedback</h1>
                  <p>${requestorName} (${requestorEmail}) would like to ask for a few moments of your time to evaluate them in <strong>StepUpp</strong></p>
                  <p>Click on the following link to do that (links expires in 7 days):</p>
                  <a href='${domain}/profile/${slug}/feedbackscore?token=${token}'>Press here</a>`;

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
          log.error(`API POST /api/accesstoken. Error creating token:`, e);
        });
      log.info(`API POST /api/accesstoken`);
      await transporter.sendMail({
        ...mailOptions,
        to: email,
        subject: subject,
        text: 'This is a test tring',
        html: html,
      });
      log.info(`API POST /api/accesstoken. Email sent`);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong', error });
    }
  }
};
