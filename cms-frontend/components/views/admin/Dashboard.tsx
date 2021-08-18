import Toolbar from '../../toolbar/AdminToolbar';

import styles from './Admin.module.css';

const Dashboard = (props: any) => {
  return (
    <>
      <Toolbar title={props.titleToolbar} />
      <div className="container-views custom-scroll">
        <h1>Dashboard</h1>
      </div>
    </>
  );
};

export default Dashboard;
