import { Form, FormGroup } from 'reactstrap';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import styles from './styles.module.scss';
import Logo from '/public/assets/logo.png';
import auth_service from '../../services/auth/auth.service';
import InputComponent from '../../components/common/inputs';
import LabelComponent from '../../components/common/label';
import ButtonComponent from '../../components/common/button';

const DashboardLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const login = await auth_service.login({ email, password }, dispatch);
      if (login.success) {
        console.log('Usuário autenticado:', login);
        router.push('/dashboard');
      } else {
        console.log(login.error);
      }
    } catch (error) {
      console.log('erro ao fazer login');
    }
  };
  return (
    <main>
      <div className={styles.container}>
        <div className={styles.container_content}>
          <div className={styles.container_logo}>
            <Image src={Logo} alt="Neko Animes" />
          </div>
          <div className={styles.container_form}>
            <Form className={styles.form} onSubmit={handleSubmit}>
              <FormGroup className={styles.form_group}>
                <InputComponent
                  id="email"
                  name="email"
                  className={styles.input}
                  placeholder=""
                  onChange={(e) => setEmail(e.target.value)}
                />
                <LabelComponent htmlFor="email" value={'E-mail'} className={styles.label} />
              </FormGroup>
              <FormGroup className={styles.form_group}>
                <InputComponent
                  id="password"
                  name="password"
                  className={styles.input}
                  placeholder=""
                  onChange={(e) => setPassword(e.target.value)}
                />
                <LabelComponent htmlFor="password" value={'Senha'} className={styles.label} />
              </FormGroup>
              <ButtonComponent value="Entrar" className="mt-3" />
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLogin;
