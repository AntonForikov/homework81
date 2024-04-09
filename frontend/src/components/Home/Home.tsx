import {Button, Grid, TextField, Typography} from '@mui/material';

const Home = () => {
  return (
    <Grid container maxWidth={700} margin='auto' marginTop={30} direction='column' alignItems='center'>
      <Typography variant='h3'>Shorten your link!</Typography>
      <TextField fullWidth label="Enter URL" sx={{marginY: 3}} />
      <Button variant='contained' color='success'>Shorten!</Button>
    </Grid>
  );
};

export default Home;