import Head from 'next/head';

import SideBar from '../nav/Sidebar';
import styles from './Layout.module.css';

const LayoutAdmin = ({ children, route }: any) => {
  return (
    <>
      <Head>
        <title>Administrador | El mundo 🌎🌎</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <SideBar option={route} />
        </div>
        <div className={styles.main}>{children}</div>
      </div>
    </>
  );
};

export default LayoutAdmin;
