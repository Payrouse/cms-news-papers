import Head from 'next/head';

const AppLayout = ({ children }: any) => {
  return (
    <>
      <Head>
        <title>Diario El Mundo 🌎🌎</title>
      </Head>
      <div>{children}</div>
    </>
  );
};

export default AppLayout;
