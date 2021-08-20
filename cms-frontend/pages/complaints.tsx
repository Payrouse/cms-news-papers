import Head from 'next/head';

import AppLayout from '../components/layouts/AppLayout';
import ComplaintsList from '../components/views/complaint/ComplaintsList';

const Complaints = () => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Diario El Mundo, donde encuentras las verdades más verdaderas de las verdades"
        />
      </Head>
      <AppLayout>
        <ComplaintsList />
      </AppLayout>
    </>
  );
};

export default Complaints;