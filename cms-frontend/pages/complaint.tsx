import Head from 'next/head';

import AppLayout from '../components/layouts/AppLayout';
import ComplaintForm from '../components/views/complaint';

const Complaint = () => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Diario El Mundo, donde encuentras las verdades más verdaderas de las verdades"
        />
      </Head>
      <AppLayout>
        <ComplaintForm />
      </AppLayout>
    </>
  );
};

export default Complaint;
