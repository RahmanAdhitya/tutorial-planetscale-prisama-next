import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GradientColor from '../../component/GradientColor';
import ModalAboutApp from '../../component/ModalAboutApp';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, signin } from '../../redux/reducer/authSlice';
import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const authSelector = useSelector(selectAuth);
  const router = useRouter();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/auth/signin', formik.values);

      if (response.status !== 200) {
        alert(response);
      } else {
        const user = response.data.data;
        dispatch(signin(user));
        localStorage.setItem('user', JSON.stringify(user));
        router.push('/');
      }
    } catch (error) {
      console.log('there was an error submitting', error);
    }
  };
  const gradient = GradientColor();

  const inputHandler = (event) => {
    const { value, name } = event.target;
    formik.setFieldValue(name, value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ background: gradient.direction.right, backgroundSize: 'auto', height: '100vh' }}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ mt: 8, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, my: 8, mx: 6, mb: 0 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField required fullWidth id="email" label="Email Address" name="email" onChange={inputHandler} />
                </Grid>
                <Grid item xs={12}>
                  <TextField required fullWidth name="password" label="Password" type="test" id="password" onChange={inputHandler} />
                </Grid>
              </Grid>
              <Grid item mt={2}>
                <Link color="secondary" href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 2, background: gradient.direction.right }}>
                Sign In
              </Button>
              <Typography variant="subtitle2" textAlign="center">
                or
              </Typography>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link color="secondary" href="/auth/signup" variant="body2">
                    Dont have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
              <ModalAboutApp sx={{ align: 'center' }} mt={0} open={open} setOpen={setOpen} handleOpen={() => handleOpen()} handleClose={() => handleClose()} />
            </Box>
          </Box>
          <Copyright sx={{ mt: 0 }} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
