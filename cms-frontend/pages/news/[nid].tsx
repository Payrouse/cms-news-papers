import Head from 'next/head';
import { useRouter } from 'next/router';

import AppLayout from '../../components/layouts/AppLayout';
import Article from '../../components/views/article';
import LoadingAdmin from '../../components/views/loading/LoadingAdmin';

const News = (props: any) => {
  const router = useRouter();
  const { nid } = router.query;
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Diario El Mundo, donde encuentras las verdades más verdaderas de las verdades"
        />
      </Head>
      <AppLayout>{nid ? <Article route={nid} /> : <LoadingAdmin />}</AppLayout>
    </>
  );
};

export default News;
