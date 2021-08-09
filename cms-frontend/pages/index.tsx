import Head from 'next/head';

import Home from '../components/views/home';
import AppLayout from '../components/layouts/AppLayout';

const Index = () => {
  return (
    <>
      <Head>
        <meta name="description" content="Diario El Mundo, donde encuentras las verdades más verdaderas de las verdades" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <Home />
      </AppLayout>
    </>
  );
};

export default Index;
