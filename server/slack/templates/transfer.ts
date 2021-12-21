import { User } from '@slack/web-api/dist/response/UsersLookupByEmailResponse';

export const getTemplate = (user: User, message: Message) => {
  return {
    blocks: [
      {
        type: 'image',
        image_url: `${process.env.URL}/templates/transfermarket.png`,
        alt_text: 'inspiration',
      },
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `${user.real_name} has a new project`,
          emoji: true,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: message.text,
        },
        accessory: {
          type: 'image',
          image_url: `${user.profile?.image_192}`,
          alt_text: `${user.real_name} has a new project`,
        },
      },
    ],
  };
};
