/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import prisma from '@/utils/prisma';
import { transporter, mailOptions } from '@/utils/nodemailer';
// import { CompetencyType } from '@/types/types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong', error });
    }
  }
  if (req.method === 'POST') {
    const { email, requestorName, requestorEmail, slug } = req.body;
    const week = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days from Today
    const token = uuidv4();
    const subject = 'Your colleague is requesting their evaluation';
    const domain = process.env.NEXTAUTH_URL;
    // const slug = 'anton-efimov';
    // console.log({ email, requestorName, requestorEmail });
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
          console.error(e);
        });

      await transporter.sendMail({
        ...mailOptions,
        to: email,
        subject: subject,
        text: 'This is a test tring',
        html: html,
      });
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong', error });
    }
  }
};
