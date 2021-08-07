import styles from './Toolbar.module.css';

interface ToolbarProps {
  title: string;
}

const Toolbar = ({ title }: ToolbarProps) => {
  return (
    <header className={styles.toolbar}>
      <div>
        <p className={styles.toolbar_title}>{title}</p>
      </div>
      <div>
        <img
          className={styles.profile_picture}
          src={'/img/dragon.svg'}
          alt="profile"
        />
      </div>
    </header>
  );
};

export default Toolbar;
