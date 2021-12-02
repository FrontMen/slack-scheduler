import { WebClient } from '@slack/web-api';

export const initClient = () => {
  return new WebClient(process.env.SLACK_TOKEN);
};

export const getChannel = () => process.env.SLACK_CHANNEL || '';
