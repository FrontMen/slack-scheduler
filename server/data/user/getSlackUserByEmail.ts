import { initClient } from '@serverdata/client';

export const getSlackUserByEmail = async (email: string) => {
  const web = initClient();
  const data = await web.users.lookupByEmail({
    email,
  });

  return data;
};
