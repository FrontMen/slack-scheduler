import { FC } from 'react';

type Props = {
  message: Message;
};
const MessageExample: FC<Props> = ({ message }) => {
  return <div>{message.text}</div>;
};

export { MessageExample };
