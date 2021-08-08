import Toolbar from '../../toolbar/AdminToolbar';

const Settings = ({ titleToolbar }: any) => {
  return (
    <>
      <Toolbar title={titleToolbar} />
      <div className="container-views">Settings</div>
    </>
  );
};

export default Settings;
