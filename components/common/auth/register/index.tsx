import styles from '../styles.module.scss';
import Image from 'next/image';
import InputComponent from '../../input';
import LabelComponent from '../../label';
import ButtonComponent from '../../button';
import Logo from '@/public/assets/head.png';
import Close from '@/public/close.png';
import { Form, FormGroup } from 'reactstrap';
import { useEffect, useState } from 'react';
import backgrounds_auth_service, {
  BackgroundsAuth,
} from '../../../../services/backgrounds-auth/backgrounds-auth.service';

interface Props {
  onClick: () => void;
  registerOpen: boolean;
}

const Register: React.FC<Props> = ({ onClick, registerOpen }) => {
  const [data, setData] = useState<BackgroundsAuth[]>([]);

  useEffect(() => {
    const fetchDate = async () => {
      try {
        const res = await backgrounds_auth_service.get();
        const randomizedData = res.sort(() => Math.random() - 0.5);
        setData(randomizedData);
        console.log(randomizedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDate();
  }, []);

  return (
    <div className={`${styles.container} ${registerOpen ? styles.container_active : ''}`}>
      <div className={`${styles.container_content} ${registerOpen ? styles.active_auth : ''}`}>
        <div className={styles.container_left}>
          {data.map((background, index) => (
            <Image
              key={index}
              src={background.url}
              alt="Background de registro"
              width={1950}
              height={1080}
              className={styles.background}
            />
          ))}
        </div>
        <div className={styles.container_right}>
          <div className={styles.container_close}>
            <Image src={Close} alt="Fechar" onClick={onClick} className={styles.close} />
          </div>
          <Form className={styles.form_register}>
            <FormGroup className={styles.form_group}>
              <Image src={Logo} alt="Neko Animes Login" className={styles.logo} />
              <InputComponent
                placeholder=""
                id="userName"
                name="userName"
                className={styles.input}
              />
              <LabelComponent htmlFor="userName" value={'Nickname'} className={styles.label} />
            </FormGroup>
            <FormGroup className={styles.form_group}>
              <InputComponent
                placeholder=""
                id="emailRegister"
                name="emailRegister"
                className={styles.input}
              />
              <LabelComponent htmlFor="emailRegister" value={'E-mail'} className={styles.label} />
            </FormGroup>
            <FormGroup className={styles.form_group}>
              <InputComponent
                placeholder=""
                type="date"
                id="birthday"
                name="birthday"
                className={styles.input}
              />
              <LabelComponent htmlFor="birthday" value={'Aniversário'} className={styles.label} />
            </FormGroup>
            <FormGroup className={styles.form_group}>
              <InputComponent
                placeholder=""
                id="passwordRegister"
                name="passwordRegister"
                className={styles.input}
              />
              <LabelComponent htmlFor="passwordRegister" value={'Senha'} className={styles.label} />
            </FormGroup>
            <ButtonComponent value={'Entrar'} className={styles.btn} />
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Register;
