import { User } from '@slack/web-api/dist/response/UsersLookupByEmailResponse';

export const getTemplate = (user: User, employee: Employee) => {
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
