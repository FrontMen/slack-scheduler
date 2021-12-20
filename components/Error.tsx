import { Box } from '@mui/material';
import { FC } from 'react';

type Props = {
  error: unknown;
};

const Error: FC<Props> = ({ error }) => {
  let errorString: string = '';
  if (typeof error === 'string') {
    errorString = error; // works, `e` narrowed to string
  } else if ((error as Error).message) {
    errorString = (error as Error).message; // works, `e` narrowed to Error
  }

  return <Box>{errorString}</Box>;
};

export { Error };
