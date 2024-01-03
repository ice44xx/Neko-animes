import styles from '../styles.module.scss';
import Image from 'next/image';
import InputComponent from '../../input';
import LabelComponent from '../../label';
import ButtonComponent from '../../button';
import Logo from '@/public/assets/head.png';
import Close from '@/public/close.png';
import { Form, FormGroup } from 'reactstrap';

const Images = [
  'https://res.cloudinary.com/doupbxhfd/image/upload/v1704237204/Register%20e%20Login/register_five_kp6qkj.jpg',
];

interface Props {
  onClick: () => void;
  registerOpen: boolean;
}

const Register: React.FC<Props> = ({ onClick, registerOpen }) => {
  return (
    <div className={`${styles.container} ${registerOpen ? styles.container_active : ''}`}>
      <div className={`${styles.container_content} ${registerOpen ? styles.active_auth : ''}`}>
        <div className={styles.container_left}>
          {Images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt="teste"
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
