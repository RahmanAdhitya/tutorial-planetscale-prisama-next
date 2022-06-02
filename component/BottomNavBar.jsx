import React from 'react';
import { AppBar, Avatar, Box, Button, IconButton, Slide, Toolbar, Typography, modal, Drawer, Input, FormControl, FormLabel } from '@mui/material';
import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import { useRouter } from 'next/router';
import Link from 'next/link';
import GradientColor from './GradientColor';
import UploadContent from './UploadContent';
import { useSelector } from 'react-redux';
import { selectAuth } from '../redux/reducer/authSlice';

const gradient = GradientColor();

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -10,
  left: 0,
  right: 0,
  margin: '0 auto',
  background: gradient.direction.radial,
});

function HideOnScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="up" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,

  window: PropTypes.func,
};

export default function BottomNavBar(props) {
  const router = useRouter();
  const authSelector = useSelector(selectAuth);

  if (!authSelector.id) {
    return '';
  } else {
    return (
      <>
        <HideOnScroll {...props}>
          <AppBar position="fixed" color="transparent" sx={{ top: 'auto', bottom: 0, border: 'none' }}>
            <Toolbar variant="regular">
              <StyledFab aria-label="add">
                {router.pathname !== '/home' ? (
                  <Link href="/">
                    <HomeRoundedIcon />
                  </Link>
                ) : (
                  <UploadContent />
                )}
              </StyledFab>
              <Box sx={{ flexGrow: 1 }} />
            </Toolbar>
          </AppBar>
        </HideOnScroll>
      </>
    );
  }
}
