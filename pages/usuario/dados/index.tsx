import Image from 'next/image';
import styles from './styles.module.scss';
import Cat from '@/public/back_profiles/profile.gif';
import ButtonComponent from '../../../components/common/button';
import UserData from '../../../components/user/forms/user-data';
import UserProfile from '../../../components/user/forms/user-profile';
import UserPassword from '../../../components/user/forms/user-password';
import { useState } from 'react';

const index = () => {
  const [form, setForm] = useState<JSX.Element | null>(<UserData />);

  const handleForm = (componentName: string) => {
    let component = null;
    if (componentName === 'Trocar Foto') {
      component = <UserProfile />;
    } else if (componentName === 'Trocar Dados') {
      component = <UserData />;
    } else if (componentName === 'Trocar Senha') {
      component = <UserPassword />;
    }
    setForm(component);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_background}>
        <Image src={Cat} alt="Profile usuário" className={styles.background} />
      </div>
      <div className={styles.container_info}>
        <div className={styles.container_info_change}>
          <ButtonComponent
            value={'Trocar Dados'}
            onClick={() => handleForm('Trocar Dados')}
            className={styles.btn}
          />
          <ButtonComponent
            value={'Trocar Foto'}
            onClick={() => handleForm('Trocar Foto')}
            className={styles.btn}
          />
          <ButtonComponent
            value={'Trocar Senha'}
            onClick={() => handleForm('Trocar Senha')}
            className={styles.btn}
          />
        </div>
        {form}
      </div>
    </div>
  );
};

export default index;
