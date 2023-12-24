import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import Heart from '/public/assets/heart.png';
import Coffe from '/public/assets/coffe.png';
import Logo from '/public/assets/logo.png';
import Search from '/public/assets/lupa.png';
import { Button, Form, Input } from 'reactstrap';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

export const Navbar = () => {
  const router = useRouter();
  const [search, setSearch] = useState(true);
  const [searchName, setSearchName] = useState('');

  const handleSearchBarVisible = () => {
    setSearch(!search);
  };

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/animes/${searchName}`);
    setSearchName('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_cta}>
        <p>
          FEITO COM
          <Image src={Heart} alt="Coração" className={styles.imgHeart} />
          E MUITO
          <Image src={Coffe} alt="Café" className={styles.imgCoffe} />
        </p>
      </div>
      <div className={styles.container_nav}>
        <Image src={Logo} alt="Neko Animes" className={styles.logo} />
        <div className={styles.container_content}>
          <Image
            src={Search}
            alt="Lupa de pesquisa"
            onClick={handleSearchBarVisible}
            className={styles.imgSearch}
          />
          <div className={styles.wrapper_container}>
            <Link href={'/register'}>
              <Button className={styles.register}>Registrar-se</Button>
            </Link>
            <Link href={'/login'}>
              <Button className={styles.login}>Entrar</Button>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${styles.container_search} ${search ? styles.active : ''}`}
        id="containerSearch"
      >
        <Form className={styles.form}>
          <Input
            value={searchName}
            onChange={(e) => {
              setSearchName(e.currentTarget.value);
            }}
            name="search"
            type="search"
            placeholder="Pesquisar..."
            className={styles.input}
          ></Input>
        </Form>
      </div>
    </div>
  );
};

export default Navbar;
