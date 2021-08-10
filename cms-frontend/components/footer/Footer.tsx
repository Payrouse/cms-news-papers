import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={`${styles.footer_container} bg-black`}>
      <div>
        <div className={styles.footer_logo_container}>
          <img
            className={styles.footer_img}
            src={'/worldwide.svg'}
            alt="img"
          />
          <p className={styles.footer_title}>El Mundo</p>
        </div>
      </div>
      <div className={styles.footer_info}>
        <div className={styles.column_info}>
          <p className="bold">Acerca</p>
          <div className={styles.column_items}>
            <p>Inicio</p>
            <p>Términos</p>
            <p>Política de privacidad</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
