import BottomNavBar from '../component/BottomNavBar';
import NavBar from '../component/NavBar';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import AuthProvider from '../component/AuthProvider';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <AuthProvider>
          <NavBar />
          <Component {...pageProps} />
          <BottomNavBar />
        </AuthProvider>
      </Provider>
    </>
  );
}

export default MyApp;
