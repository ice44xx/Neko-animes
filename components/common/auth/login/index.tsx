import styles from '../styles.module.scss';
import Image from 'next/image';
import InputComponent from '../../input';
import LabelComponent from '../../label';
import ButtonComponent from '../../button';
import Logo from '@/public/assets/head.png';
import Close from '@/public/close.png';
import { Form, FormGroup } from 'reactstrap';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import auth_service from '../../../../services/auth/auth.service';
import { useDispatch } from 'react-redux';
import { UsersLogin } from '../../../../services/users/users.service';
import backgrounds_auth_service, {
  BackgroundsAuth,
} from '../../../../services/backgrounds-auth/backgrounds-auth.service';

interface Props {
  onClick: () => void;
  loginOpen: boolean;
}

const Login: React.FC<Props> = ({ onClick, loginOpen }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [data, setData] = useState<BackgroundsAuth[]>([]);
  const [users, setUsers] = useState<UsersLogin>({
    email: '',
    password: '',
  });

  useEffect(() => {
    const fetchDate = async () => {
      try {
        const res = await backgrounds_auth_service.get();
        const randomizedData = res.sort(() => Math.random() - 0.5);
        const firstRandomItem = randomizedData.slice(0, 1);
        setData(firstRandomItem);
        console.log(randomizedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDate();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const login = await auth_service.login(users, dispatch);
      if (login.success) {
        console.log('Usuário autenticado:', login);
        router.push('/');
        if (router.pathname === '/') {
          window.location.reload();
        }
      } else {
        console.log(login.error);
      }
    } catch (error) {
      console.log('erro ao fazer login');
    }
  };

  return (
    <div className={`${styles.container} ${loginOpen ? styles.container_active : ''}`}>
      <div className={`${styles.container_content} ${loginOpen ? styles.active_auth : ''}`}>
        <div className={styles.container_left}>
          {data.map((background, index) => (
            <Image
              key={index}
              src={background.url}
              alt="Background de login"
              width={1950}
              height={1080}
              className={styles.background}
            />
          ))}
          <div className={styles.container_close}>
            <Image src={Close} alt="Fechar" onClick={onClick} className={styles.close} />
          </div>
        </div>
        <div className={styles.container_right}>
          <div className={styles.container_close}>
            <Image src={Close} alt="Fechar" onClick={onClick} className={styles.close} />
          </div>
          <Form className={styles.form} onSubmit={handleSubmit}>
            <FormGroup className={styles.form_group}>
              <Image src={Logo} alt="Neko Animes Login" className={styles.logo} />
              <InputComponent
                placeholder=""
                id="emailLogin"
                name="emailLogin"
                className={styles.input}
                onChange={(e) => setUsers({ ...users, email: e.target.value })}
              />
              <LabelComponent htmlFor="emailLogin" value={'E-mail'} className={styles.label} />
            </FormGroup>
            <FormGroup className={styles.form_group}>
              <InputComponent
                type="password"
                placeholder=""
                id="passwordLogin"
                name="passwordLogin"
                className={styles.input}
                onChange={(e) => setUsers({ ...users, password: e.target.value })}
              />
              <LabelComponent htmlFor="passwordLogin" value={'Senha'} className={styles.label} />
            </FormGroup>
            <ButtonComponent value={'Entrar'} className={styles.btn} />
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Login;
