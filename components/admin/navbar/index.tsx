import styles from './styles.module.scss';
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ButtonComponent from '../../common/button';

const NavbarAdmin = () => {
  const router = useRouter();
  const [navbarOpen, setNavbarOpen] = useState(true);
  const Logout = () => {
    sessionStorage.clear();
    router.push('/neko-admin-login');
  };

  const toggleNavbar = () => setNavbarOpen(!navbarOpen);

  return (
    <>
      <div className={styles.navbar}>
        <Link href={'/dashboard'}>
          <img src="/assets/logo.png" alt="" />
        </Link>
        <Button onClick={toggleNavbar} className={styles.btn}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </Button>
      </div>
      <div className={`${styles.navbarOpen} ${navbarOpen ? styles.active : ''}`}>
        <div className={styles.container_navbar}>
          <Button onClick={toggleNavbar} className={styles.btn}>
            <img src="/assets/fechar.png" alt="fechar" className={styles.close} />
          </Button>
          <Link href={'/dashboard/animes'} className={styles.link}>
            <p>Animes</p>
          </Link>
          <Link href={'/dashboard/firstcategory'} className={styles.link}>
            <p>Categorias</p>
          </Link>
          <Link href={'/dashboard/seasons'} className={styles.link}>
            <p>Temporadas</p>
          </Link>
          <Link href={'/dashboard/episodes'} className={styles.link}>
            <p>Episódios</p>
          </Link>
          <Link href={'/dashboard/backgrounds'} className={styles.link}>
            <p>Planos de fundos</p>
          </Link>
          <Link href={'/dashboard/users'} className={styles.link}>
            <p>Usuários</p>
          </Link>
          <ButtonComponent value="Sair" onClick={Logout} className={styles.loggout} />
        </div>
      </div>
    </>
  );
};

export default NavbarAdmin;
