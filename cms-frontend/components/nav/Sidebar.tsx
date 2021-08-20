import Link from 'next/link';
import { useSelector } from 'react-redux';
import { UserRole } from '../../models/user.model';
import { StoreType } from '../../redux/types';
import { OnlyAdmin, OnlyJournalist, OnlyPublisher } from '../../utils/Roles';

import IconPath from '../../utils/svg/IconPath';
import styles from './NavBar.module.css';

const SideBar = ({ option }: any) => {
  const { isLogin, loading, user } = useSelector(
    (state: StoreType) => state.user,
  );

  const getColorRole = () => {
    if (user && user.roles.includes(UserRole.ADMIN)) return styles.header_admin;

    if (user && user.roles.includes(UserRole.PUBLISHER))
      return styles.header_publisher;

    if (user && user.roles.includes(UserRole.JOURNALIST))
      return styles.header_editor;

    return styles.header_editor;
  };

  const getNavItemColor = () => {
    if (user && user.roles.includes(UserRole.ADMIN))
      return {
        navActive: `${styles.nav_item_active} ${styles.active_admin}`,
        navIdle: `${styles.nav_item} ${styles.item_admin}`,
      };

    if (user && user.roles.includes(UserRole.PUBLISHER))
      return {
        navActive: `${styles.nav_item_active} ${styles.active_publisher}`,
        navIdle: `${styles.nav_item} ${styles.item_publisher}`,
      };

    if (user && user.roles.includes(UserRole.JOURNALIST))
      return {
        navActive: `${styles.nav_item_active} ${styles.active_editor}`,
        navIdle: `${styles.nav_item} ${styles.item_editor}`,
      };

    return {
      navActive: `${styles.nav_item_active} ${styles.active_editor}`,
      navIdle: `${styles.nav_item} ${styles.item_editor}`,
    };
  };

  const getTitle = () => {
    if (user && user.roles.includes(UserRole.ADMIN)) return 'Admin';

    if (user && user.roles.includes(UserRole.PUBLISHER))
      return 'Jefe de publicación';

    if (user && user.roles.includes(UserRole.JOURNALIST)) return 'Periodista';

    return 'Editor';
  };

  return (
    <>
      <div className={styles.container}>
        <header className={`${styles.header} ${getColorRole()}`}>
          <img
            className={`${styles.header_img} shadow`}
            src={user?.avatar || '/worldwide.svg'}
            alt="sidebar"
          />
          <p className="text-white font-bold text-center text-lg">{`${user.firstName} ${user.lastName}`}</p>
          <p className="text-white font-bold text-center">{`${user.email}`}</p>
          <h2 className="text-white font-bold italic text-center text-sm">
            {getTitle()}
          </h2>
        </header>
        <div>
          <ul className={styles.nav}>
            <NavItem
              active={option && option[0] === '/'}
              icon={IconPath.dashboard}
              toUrl="/"
              name="Inicio"
              colors={getNavItemColor()}
            />
            {OnlyJournalist(user && user.roles) ? (
              <NavItem
                active={option && option[0] === 'editor'}
                icon={IconPath.typeWriter}
                toUrl="/editor"
                name="Redacción"
                colors={getNavItemColor()}
              />
            ) : null}
            {OnlyPublisher(user && user.roles) ? (
              <NavItem
                active={option && option[0] === 'publish'}
                icon={IconPath.publish}
                toUrl="/publish"
                name="Revisión"
                colors={getNavItemColor()}
              />
            ) : null}
            {OnlyAdmin(user && user.roles) ? (
              <NavItem
                active={option && option[0] === 'users'}
                icon={IconPath.users}
                toUrl="/users"
                name="Usuarios"
                colors={getNavItemColor()}
              />
            ) : null}
            <NavItem
              active={option && option[0] === 'settings'}
              icon={IconPath.settings}
              toUrl="/settings"
              name="Configuración"
              colors={getNavItemColor()}
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
  colors: {
    navActive: string;
    navIdle: string;
  };
}

const NavItem = ({ active, name, icon, toUrl, colors }: NavItemProps) => {
  return (
    <li>
      <Link href={`/admin${toUrl}`}>
        <a className={active ? colors.navActive : colors.navIdle}>
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
