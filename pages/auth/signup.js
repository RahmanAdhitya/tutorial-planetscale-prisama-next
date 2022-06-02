import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GradientColor from '../../component/GradientColor';
import { useFormik } from 'formik';

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
  const gradient = GradientColor();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
      full_name: '',
    },
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formik.values),
      });
      const result = await response.json();
      if (response.status !== 200) {
        alert(result.error);
      } else {
        const user = result.data;
        localStorage.setItem('user', JSON.stringify(user));
        alert(`new account ${formik.values.full_name}`);
      }
    } catch (error) {
      console.log('there was an error submitting', error);
    }
  };

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
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, my: 8, mx: 6 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField required fullWidth id="username" label="Username" name="username" onChange={inputHandler} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField name="full_name" required fullWidth id="full_name" label="Full Name" onChange={inputHandler} />
                </Grid>
                <Grid item xs={12}>
                  <TextField required fullWidth id="email" label="Email Address" name="email" onChange={inputHandler} />
                </Grid>
                <Grid item xs={12}>
                  <TextField required fullWidth name="password" label="Password" type="password" id="password" onChange={inputHandler} />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link color="secondary" href="/auth/signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
