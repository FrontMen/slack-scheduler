import { CircularProgress, Grid } from '@mui/material';

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
