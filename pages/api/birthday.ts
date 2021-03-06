// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSlackUserByEmail } from '@serverdata/user';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getChannel, initClient } from '@serverdata/client';
import { User } from '@slack/web-api/dist/response/UsersLookupByEmailResponse';
import { Block, ChatPostMessageArguments, KnownBlock } from '@slack/web-api/dist/methods';
import { ChatPostMessageResponse } from '@slack/web-api';
import { getTemplate } from 'server/slack/templates/birthday';
import { getBirthdayToSend } from '@data/messages/getBirthdayToSend';

const call = async (req: NextApiRequest, res: NextApiResponse<ChatPostMessageResponse>) => {
  const employee = await getBirthdayToSend();
  console.log({ employee });
  if (!employee) {
    throw new Error(`No employee found`);
  }

  const { user } = await getSlackUserByEmail(employee.email);

  if (!user) {
    throw new Error(`no user found on address: ${employee.email}`);
  }

  const web = initClient();

  const payload: ChatPostMessageArguments = {
    ok: true,
    channel: getChannel(),
    as_user: true,
    ...getTemplate(user, employee),
  };

  try {
    const data = await web.chat.postMessage(payload);
    res.status(200).json(data);
  } catch (e) {
    throw new Error(`Server error ${res.status}`);
  }
};

export default call;
