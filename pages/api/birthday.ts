// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSlackUserByEmail } from '@serverdata/user';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getChannel, initClient } from '@serverdata/client';
import { User } from '@slack/web-api/dist/response/UsersLookupByEmailResponse';
import { Block, ChatPostMessageArguments, KnownBlock } from '@slack/web-api/dist/methods';
import { ChatPostMessageResponse } from '@slack/web-api';
import { getTemplate } from 'server/slack/templates/transfer';

type SlackMessage = {
  text: string;
  blocks: (KnownBlock | Block)[];
};
const createBirthdayMessage = (user?: User): SlackMessage => {
  if (!user)
    return {
      text: '',
      blocks: [],
    };

  const text = `@${user.name} Danny Torrence left the following review for your property:`;

  return {
    text,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text,
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
          image_url: user.profile?.image_48,
          alt_text: 'Profile picture',
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
};

const call = async (req: NextApiRequest, res: NextApiResponse<ChatPostMessageResponse>) => {
  const email = 'steven.straatemans@frontmen.nl';
  const { user } = await getSlackUserByEmail(email);

  if (!user) {
    throw new Error(`no user found on address: ${email}`);
  }

  const message = {
    text: 'hier komt text',
  } as Message;

  const web = initClient();

  const payload: ChatPostMessageArguments = {
    ok: true,
    channel: getChannel(),
    as_user: true,
    ...getTemplate(user, message),
  };

  try {
    const data = await web.chat.postMessage(payload);
    res.status(200).json(data);
  } catch (e) {
    throw new Error(`Server error ${res.status}`);
  }
};

export default call;
