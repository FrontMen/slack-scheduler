// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSlackUserByEmail } from '@serverdata/user';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getChannel, initClient } from '@serverdata/client';
import { ChatPostMessageArguments } from '@slack/web-api/dist/methods';
import { ChatPostMessageResponse } from '@slack/web-api';
import { getMessageToSend } from '@data/messages/getMessageToSend';

const call = async (req: NextApiRequest, res: NextApiResponse<ChatPostMessageResponse>) => {
  const message = await getMessageToSend();

  const email = 'steven.straatemans@frontmen.nl';
  const { user } = await getSlackUserByEmail(email);

  const messageType = 'TRANSFER';
  const { getTemplate } = require(`./../../server/slack/templates/${messageType.toLowerCase()}`);

  console.log(1111, getTemplate);

  if (!user) {
    throw new Error(`no user found on address: ${email}`);
  }

  const web = initClient();

  console.log(getTemplate(user, message));

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
