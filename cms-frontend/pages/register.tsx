import Head from 'next/head';
import RegisterForm from '../components/views/register';

const Register = (props: any) => {
  return (
    <>
      <Head>
        <title>Registrarse | Diario El Mundo 🌎🌎🌎</title>
      </Head>
      <RegisterForm />
    </>
  );
};

export default Register;
