import Head from 'next/head';
import LoginForm from '../components/views/login';

const Login = (props: any) => {
  return (
    <>
      <Head>
        <title>Iniciar Sesiรณn | Diario El Mundo ๐๐๐</title>
      </Head>
      <LoginForm />
    </>
  );
};

export default Login;
