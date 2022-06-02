import * as React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectAuth } from '../redux/reducer/authSlice';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Redirect = () => {
  const router = useRouter();
  const authSelector = useSelector(selectAuth);

  const push = () => {
    if (authSelector.id) {
      router.push('/home');
    } else if (!authSelector.id) {
      router.push('/auth/signin');
    }
  };

  React.useEffect(() => {
    if (router.isReady) {
      push();
    }
  }, [router.isReady]);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress />
    </Box>
  );
};

export default Redirect;
