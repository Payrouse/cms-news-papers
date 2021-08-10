import Head from 'next/head';
import AppLayout from '../../components/layouts/AppLayout';
import ProfileDetails from '../../components/profile/ProfileDetails';
import UpdateProfileForm from '../../components/profile/UpdateProfileForm';

const Profile = (props: any) => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Diario El Mundo, donde encuentras las verdades más verdaderas de las verdades"
        />
      </Head>
      <AppLayout>
        <div className="flex mx-32 p-4">
          <ProfileDetails></ProfileDetails>
          <UpdateProfileForm></UpdateProfileForm>
        </div>
      </AppLayout>
    </>
  );
};

export default Profile;
