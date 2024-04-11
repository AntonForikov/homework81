import React from 'react';
import {Typography} from '@mui/material';
import axiosApi from '../../axiosAPI';

interface Props {
  shortUrl: string,
  originalUrl: string
}
const Answer: React.FC<Props> = ({shortUrl, originalUrl}) => {
  const redirectByShortId = async () => {
    await axiosApi.get(`/links/${shortUrl}`);
  };

  return (
    <>
      <Typography variant='h4' marginY={3}>Your link now looks like this:</Typography>
      <a href={originalUrl} onClick={redirectByShortId} target='_blank'>http://localhost:8000/{shortUrl}</a>
    </>
  );
};

export default Answer;