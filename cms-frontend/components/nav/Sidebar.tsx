import Link from 'next/link';

import IconPath from '../../utils/svg/IconPath';
import styles from './NavBar.module.css';

const SideBar = ({ option }: any) => {
  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <img
            className={styles.header_img}
            src={'/img/burger.svg'}
            alt="sidebar"
          />
          <h2 className={styles.header_title}>Admin</h2>
        </header>
        <div>
          <ul className={styles.nav}>
            <NavItem
              active={option && option[0] === '/'}
              icon={IconPath.dashboard}
              toUrl="/"
              name="Inicio"
            />
            <NavItem
              active={option && option[0] === 'editor'}
              icon={IconPath.typeWriter}
              toUrl="/editor"
              name="Redacción"
            />
            <NavItem
              active={option && option[0] === 'publish'}
              icon={IconPath.publish}
              toUrl="/publish"
              name="Revisión"
            />
            <NavItem
              active={option && option[0] === 'settings'}
              icon={IconPath.settings}
              toUrl="/settings"
              name="Configuración"
            />
          </ul>
        </div>
      </div>
    </>
  );
};

interface NavItemProps {
  active: boolean;
  icon: string;
  toUrl: string;
  name: string;
}

const NavItem = ({ active, name, icon, toUrl }: NavItemProps) => {
  return (
    <li>
      <Link href={`/admin${toUrl}`}>
        <a className={active ? styles.nav_item_active : styles.nav_item}>
          <div />
          <svg viewBox="0 0 24 24">
            <path fill="currentColor" d={icon} />
          </svg>
          <p>{name}</p>
        </a>
      </Link>
    </li>
  );
};

export default SideBar;
