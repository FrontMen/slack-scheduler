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
    <div className={classes.root}>
      <MUIFab {...props} color='primary'>
        {children as ReactChild}
      </MUIFab>
    </div>
  );
};

export { Fab };
