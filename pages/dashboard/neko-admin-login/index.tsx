import Image from 'next/image';
import styles from './styles.module.scss';
import Logo from '/public/assets/logo.png';
import { Form, FormGroup } from 'reactstrap';
import InputComponent from '../../../components/common/inputs';
import LabelComponent from '../../../components/common/label';
import Button from '../../../components/common/button';
import { FormEvent, useState } from 'react';
import auth_service from '../../../services/auth/auth.service';
import { useRouter } from 'next/router';

const DashboardLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const login = await auth_service.login({ email, password });

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
              <Button value="Entrar" className="mt-3" />
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLogin;
