// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

const SLACK_BOT_TOKEN = process.env.SLACK_TOKEN;

const payload = {
  ok: true,
  channel: 'general',
  as_user: true,
  text: 'New Paid Time Off request from Fred Enriquez',
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'Danny Torrence left the following review for your property:',
      },
    },
    {
      type: 'section',
      block_id: 'section567',
      text: {
        type: 'mrkdwn',
        text: '<https://example.com|Overlook Hotel> \n :star: \n Doors had too many axe holes, guest in room 237 was far too rowdy, whole place felt stuck in the 1920s.',
      },
      accessory: {
        type: 'image',
        image_url:
          'https://is5-ssl.mzstatic.com/image/thumb/Purple3/v4/d3/72/5c/d3725c8f-c642-5d69-1904-aa36e4297885/source/256x256bb.jpg',
        alt_text: 'Haunted hotel image',
      },
    },
    {
      type: 'section',
      block_id: 'section789',
      fields: [
        {
          type: 'mrkdwn',
          text: '*Average Rating*\n1.0',
        },
      ],
    },
  ],
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': payload.length,
      Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
      Accept: 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Server error ${res.status}`);
      }

      return res.json();
    })
    .catch((error) => {
      console.log(error);
    });

  res.status(200).json({ name: 'John Doe' });
};
