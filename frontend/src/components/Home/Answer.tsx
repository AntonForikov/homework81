import React from 'react';
import {Typography} from '@mui/material';

interface Props {
  shortUrl: string,
  originalUrl: string
}
const Answer: React.FC<Props> = ({shortUrl, originalUrl}) => {
  return (
    <>
      <Typography variant='h4' marginY={3}>Your link now looks like this:</Typography>
      <a href={originalUrl} target='_blank'>http://localhost:8000/{shortUrl}</a>
    </>
  );
};

export default Answer;