import * as React from 'react';
import { useDispatch } from 'react-redux';
import { logout, signin } from '../redux/reducer/authSlice';
import { useRouter } from 'next/router';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const redirectSignin = () => {
    if (router.pathname === '/auth/signin' || router.pathname === '/auth/signup') {
      router.push('/home');
    }
  };
  React.useEffect(() => {
    const getUserData = localStorage.getItem('user');
    if (!getUserData) {
      const initialState = {
        id: 0,
        username: '',
        email: '',
        full_name: '',
        bio: '',
        picture_url: '',
      };
      dispatch(logout(initialState));
    } else {
      const parsedUserData = JSON.parse(getUserData);
      dispatch(signin(parsedUserData));
      redirectSignin();
    }
  }, []);
  return <div>{children}</div>;
};

export default AuthProvider;
