import Head from 'next/head';
import LoginForm from '../components/views/login';

const Login = (props: any) => {
  return (
    <>
      <Head>
        <title>Iniciar Sesión | Diario El Mundo 🌎🌎🌎</title>
      </Head>
      <LoginForm />
    </>
  );
};

export default Login;
