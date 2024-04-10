import {Button, CircularProgress, Grid, TextField, Typography} from '@mui/material';
import React, {useState} from 'react';
import {Url, UrlFromAPI} from '../../../types';
import axiosApi from '../../axiosAPI';
import Answer from './Answer';

const Home = () => {
  const [url, setUrl] = useState<Url>({url: ''});
  const [urlApi, setUrlApi] = useState<UrlFromAPI | null>(null);
  const [loading, setLoading] = useState(false);

  const changeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setUrl((prevState) => ({
      ...prevState,
      [name]: value
    }))
  };

  const submitUrl = async () => {
    if (url.url[0] === ' ') {
      alert("URL can't start from whitespace.");
    } else if (url.url === '') {
      alert("URL can't be an empty string.")
    } else {
      try {
        setLoading(true);
        const {data} = await axiosApi.post<UrlFromAPI>('/links', url);
        setUrl({url: ''});
        setUrlApi(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Grid container maxWidth={700} margin='auto' marginTop={30} direction='column' alignItems='center'>
      <Typography variant='h3'>Shorten your link!</Typography>
      <TextField
        fullWidth
        label="Enter URL"
        sx={{marginY: 3}}
        name='url'
        value={url.url}
        onChange={changeUrl}
      />
      <Button
        variant='contained'
        color='success'
        onClick={submitUrl}
        disabled={loading}
      >
        Shorten!
      </Button>
      {
        loading
          ? <CircularProgress />
          : !loading && urlApi
            ? <Answer
              shortUrl={urlApi.shortUrl}
              originalUrl={urlApi.originalUrl}
            />
            : null
      }
    </Grid>
  );
};

export default Home;