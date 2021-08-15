import Head from 'next/head';

import AppLayout from '../../components/layouts/AppLayout';
import Article from '../../components/views/article';

const News = (props: any) => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Diario El Mundo, donde encuentras las verdades más verdaderas de las verdades"
        />
      </Head>
      <AppLayout>
        <Article />
      </AppLayout>
    </>
  );
};

export default News;
