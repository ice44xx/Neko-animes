import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/public/assets/logo.png';
import Close from '@/public/close.png';
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { useRouter } from 'next/router';

const NavbarAdmin = () => {
  const router = useRouter();
  const [navbarOpen, setNavbarOpen] = useState(true);
  const Logout = () => {
    sessionStorage.clear();
    router.push('/neko-admin');
  };

  const toggleNavbar = () => setNavbarOpen(!navbarOpen);

  return (
    <>
      <div className={styles.navbar}>
        <Link href={'/neko-admin/dashboard'}>
          <Image src={Logo} alt="Neko Animes" className={styles.logo} />
        </Link>
        <Button onClick={toggleNavbar} className={styles.btn}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </Button>
      </div>
      <div
        className={`${styles.navbarOpen} ${navbarOpen ? styles.active : ''}`}
        onClick={toggleNavbar}
      >
        <div className={`${styles.container_navbar} ${navbarOpen ? styles.container_active : ''}`}>
          <Button onClick={toggleNavbar} className={styles.btn}>
            <Image src={Close} alt="Fechar" className={styles.close} />
          </Button>
          <Link href={'/neko-admin/dashboard/types-animes'} className={styles.link}>
            <p>Tipos</p>
          </Link>
          <Link href={'/neko-admin/dashboard/animes'} className={styles.link}>
            <p>Animes</p>
          </Link>
          <Link href={'/neko-admin/dashboard/categories'} className={styles.link}>
            <p>Categorias</p>
          </Link>
          <Link href={'/neko-admin/dashboard/classifications'} className={styles.link}>
            <p>Classificação</p>
          </Link>
          <Link href={'/neko-admin/dashboard/seasons'} className={styles.link}>
            <p>Temporadas</p>
          </Link>
          <Link href={'/neko-admin/dashboard/episodes'} className={styles.link}>
            <p>Episódios</p>
          </Link>
          <Link href={'/neko-admin/dashboard/backgrounds'} className={styles.link}>
            <p>Planos de fundos</p>
          </Link>
          <Link href={'/neko-admin/dashboard/backgrounds-auth'} className={styles.link}>
            <p>Fundos de autenticação</p>
          </Link>
          <Link href={'/neko-admin/dashboard/roles'} className={styles.link}>
            <p>Roles</p>
          </Link>
          <Link href={'/neko-admin/dashboard/users'} className={styles.link}>
            <p>Usuários</p>
          </Link>
          <p onClick={Logout} className={styles.loggout}>
            Sair
          </p>
        </div>
      </div>
    </>
  );
};

export default NavbarAdmin;
