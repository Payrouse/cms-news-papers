import Head from 'next/head';
import AppLayout from '../../components/layouts/AppLayout';

const Category = (props: any) => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Diario El Mundo, donde encuentras las verdades más verdaderas de las verdades"
        />
      </Head>
      <AppLayout>
        <div>
          <h1>I am Category</h1>
        </div>
      </AppLayout>
    </>
  );
};

export default Category;
