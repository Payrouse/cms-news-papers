import Head from 'next/head';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { endUserLoading, getMe } from '../../redux/actions/userAction';
import Footer from '../footer/Footer';
import AppToolbar from '../toolbar/AppToolbar';

const AppLayout = ({ children }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (Cookies.get('_mtn')) {
      dispatch(getMe());
    } else {
      dispatch(endUserLoading());
    }
  }, []);

  return (
    <>
      <Head>
        <title>Diario El Mundo 🌎🌎</title>
      </Head>
      <div className="bg-white">
        <AppToolbar />
        <div className="mt-7">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default AppLayout;
