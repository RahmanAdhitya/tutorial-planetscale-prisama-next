import React from 'react';
import { AppBar, Avatar, Box, IconButton, Menu, MenuItem, MenuList, Toolbar, Tooltip, Typography } from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import { useRouter } from 'next/router';
import GradientColor from './GradientColor';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectAuth } from '../redux/reducer/authSlice';

const NavBar = () => {
  const settings = ['Profile', 'Account', 'Dashboard'];
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElMenu, setAnchorElMenu] = React.useState(null);
  const authSelector = useSelector(selectAuth);
  const dispatch = useDispatch();

  const router = useRouter();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenMenu = (event) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };

  const logoutHandler = () => {
    localStorage.clear();
    const initialState = {
      id: 0,
      username: '',
      email: '',
      full_name: '',
      bio: '',
      picture_url: '',
    };
    dispatch(logout(initialState));
    router.push('/auth/signin');
    setAnchorElUser(null);
  };
  const gradient = GradientColor();

  if (!authSelector.id) {
    return '';
  } else {
    return (
      <Box sx={{ flexGrow: 1, mb: 8 }}>
        <AppBar sx={{ border: 0, background: gradient.direction.right, borderColor: 'transparent' }}>
          <Toolbar>
            <Tooltip title="Account Menu">
              <IconButton onClick={handleOpenUserMenu} sx={{ mr: 2, boxShadow: 0 }}>
                <Avatar alt={authSelector.username} src={authSelector.picture_url} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '35px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={logoutHandler}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Hello {authSelector.full_name}
            </Typography>
            <IconButton sx={{ mr: 2 }}>
              <SearchIcon />
            </IconButton>
            <Tooltip title="App menu">
              <IconButton onClick={handleOpenMenu}>
                <MoreIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '35px' }}
              id="menu-appbar"
              anchorEl={anchorElMenu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElMenu)}
              onClose={handleCloseMenu}
            >
              <MenuList>
                <MenuItem onClick={handleCloseMenu}>
                  <Link href={'/notification'}>
                    <Typography textAlign="center">Notification</Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseMenu}>
                  <Link href={'/activities'}>
                    <Typography textAlign="center">Activities</Typography>
                  </Link>
                </MenuItem>
              </MenuList>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
};

export default NavBar;
