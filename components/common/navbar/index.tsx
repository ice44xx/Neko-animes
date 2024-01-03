import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import Heart from '/public/assets/heart.png';
import Coffe from '/public/assets/coffe.png';
import Logo from '/public/assets/logo.png';
import Search from '/public/assets/lupa.png';
import Login from '../auth/login';
import Register from '../auth/register';
import { Button, Form, Input } from 'reactstrap';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

export const Navbar = () => {
  const router = useRouter();
  const [login, setLogin] = useState(true);
  const [register, setRegister] = useState(true);
  const [search, setSearch] = useState(true);
  const [searchName, setSearchName] = useState('');

  const handleSearchBarVisible = () => {
    setSearch(!search);
  };

  const handleLogin = () => {
    setLogin(!login);
  };

  const handleRegister = () => {
    setRegister(!register);
  };

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/animes/buscar/${searchName}`);
    setSearchName('');
    setSearch(true);
  };

  return (
    <>
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
          <Link href={'/'}>
            <Image src={Logo} alt="Neko Animes" className={styles.logo} />
          </Link>
          <div className={styles.container_content}>
            <Image
              src={Search}
              alt="Lupa de pesquisa"
              onClick={handleSearchBarVisible}
              className={styles.imgSearch}
            />
            <div className={styles.wrapper_container}>
              <Button className={styles.register} onClick={handleRegister}>
                Registrar-se
              </Button>
              <Button className={styles.login} onClick={handleLogin}>
                Entrar
              </Button>
            </div>
          </div>
        </div>
        <div className={`${styles.container_search} ${search ? styles.active : ''}`}>
          <Form className={styles.form} onSubmit={handleSearch}>
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
      <Login onClick={handleLogin} loginOpen={login} />
      <Register onClick={handleRegister} registerOpen={register} />
    </>
  );
};

export default Navbar;
