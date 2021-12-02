import { Box } from '@material-ui/core';
import { FC } from 'react';

type Props = {
  error: unknown;
};

const Error: FC<Props> = ({ error }) => {
  console.log({ error });
  let errorString;
  if (typeof error === 'string') {
    errorString = error; // works, `e` narrowed to string
  } else if (error.message) {
    errorString = (error as Error).message; // works, `e` narrowed to Error
  }

  return <Box>{errorString}</Box>;
};

export { Error };
