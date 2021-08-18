import Toolbar from '../../../toolbar/AdminToolbar';

const Settings = ({ titleToolbar }: any) => {
  return (
    <>
      <Toolbar title={titleToolbar} />
      <div className="container-views custom-scroll">
        <div className="my-6 w-full bg-white rounded border-gray-200 shadow">
          <div>cambiar foto de perfil</div>
          <div>cambiar datos del usuario</div>
          <div>cambiar contraseña</div>
        </div>
      </div>
    </>
  );
};

export default Settings;
