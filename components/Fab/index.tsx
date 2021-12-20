import { FC, ReactChild } from 'react';
import { Fab as MUIFab } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    zIndex: 999,
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
  },
});

type Props = {
  onClick: () => void;
};

const Fab: FC<Props> = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <MUIFab {...props} color='primary' className={classes.root}>
      {children as ReactChild}
    </MUIFab>
  );
};

export { Fab };
