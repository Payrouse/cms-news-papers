import Head from 'next/head';
import AppToolbar from '../toolbar/AppToolbar';

const AppLayout = ({ children }: any) => {
  return (
    <>
      <Head>
        <title>Diario El Mundo 🌎🌎</title>
      </Head>
      <div className="bg-white">
        <AppToolbar />
        <div className="mt-7">{children}</div>
      </div>
    </>
  );
};

export default AppLayout;
