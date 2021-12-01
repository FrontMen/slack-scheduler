import { CircularProgress, Grid } from '@material-ui/core';

export const FullpageLoader = () => {
  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justifyContent='center'
      style={{ minHeight: '100vh' }}
    >
      <CircularProgress />
    </Grid>
  );
};
