import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import Heart from '/public/assets/heart.png';
import Coffe from '/public/assets/coffe.png';
import Logo from '/public/assets/logo.png';
import Search from '/public/assets/lupa.png';
import Cat from '@/public/assets/cat_profile.png';
import Modal from '../modal';
import { Form, Input } from 'reactstrap';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import users_service, { UsersGet } from '../../../services/users/users.service';

export const NavbarUser = () => {
  const router = useRouter();
  const [search, setSearch] = useState(true);
  const [searchName, setSearchName] = useState('');
  const [userSettings, setUserSettings] = useState(true);
  const [data, setData] = useState<UsersGet>();

  const handleSearchBarVisible = () => {
    setSearch(!search);
  };

  const handleUserSettings = () => {
    setUserSettings(!userSettings);
  };

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/animes/buscar/${searchName}`);
    setSearchName('');
    setSearch(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await users_service.getUser();
        setData(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
              {data && (
                <>
                  <div className={styles.container_user}>
                    <p className={styles.userName}>{data.userName}</p>
                  </div>
                  <div className={styles.container_profile} onClick={handleUserSettings}>
                    {data.profile ? (
                      <Image
                        src={data.profile}
                        alt={data.userName}
                        fill
                        className={styles.profile}
                      />
                    ) : (
                      <Image
                        src={Cat}
                        alt="Imagem de perfil padrão"
                        width={80}
                        height={80}
                        className={styles.profile_cat}
                      />
                    )}
                    <Modal active={userSettings} />
                  </div>
                </>
              )}
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
    </>
  );
};

export default NavbarUser;
