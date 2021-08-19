import Head from 'next/head';
import { useRouter } from 'next/router';

import AppLayout from '../../components/layouts/AppLayout';
import Article from '../../components/views/article';

const News = (props: any) => {
  const router = useRouter();
  const { nid } = router.query;
  console.log("Aca ->",nid)
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Diario El Mundo, donde encuentras las verdades más verdaderas de las verdades"
        />
      </Head>
      <AppLayout>
        <Article route={nid}/>
      </AppLayout>
    </>
  );
};

export default News;
