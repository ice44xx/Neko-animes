import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import Heart from '/public/assets/heart.png';
import Coffe from '/public/assets/coffe.png';
import Logo from '/public/assets/logo.png';
import Search from '/public/assets/lupa.png';
import Cat from '@/public/assets/cat_profile.png';
import { Form, Input } from 'reactstrap';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { UsersGet } from '../../../services/users/users.service';

export const NavbarUser = () => {
  const router = useRouter();
  const [search, setSearch] = useState(true);
  const [searchName, setSearchName] = useState('');
  const [userInfo, setUserInfo] = useState<UsersGet>();

  const handleSearchBarVisible = () => {
    setSearch(!search);
  };

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/animes/buscar/${searchName}`);
    setSearchName('');
    setSearch(true);
  };

  useEffect(() => {
    const userInfoFromSession = sessionStorage.getItem('userInfo');
    if (userInfoFromSession) {
      setUserInfo(JSON.parse(userInfoFromSession));
    }
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
              {userInfo && (
                <>
                  <div className={styles.container_user}>
                    <p className={styles.userName}>{userInfo.userName}</p>
                  </div>
                  <div className={styles.container_profile}>
                    {userInfo.profile ? (
                      <Image
                        src={userInfo.profile}
                        alt={userInfo.userName}
                        width={80}
                        height={80}
                        className={styles.profile}
                      />
                    ) : (
                      <Image
                        src={Cat}
                        alt="Imagem de perfil padrão"
                        width={80}
                        height={80}
                        className={styles.profile}
                      />
                    )}
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
