import styles from '../styles.module.scss';
import LabelComponent from '../../../common/label';
import InputComponent from '../../../common/input';
import ButtonComponent from '../../../common/button';
import { Form, FormGroup } from 'reactstrap';
import { FormEvent, useEffect, useState } from 'react';
import users_service, { User } from '../../../../services/users/users.service';
import { useRouter } from 'next/router';

const UserData = () => {
  const router = useRouter();
  const [data, setData] = useState<User>({
    userName: '',
    email: '',
    birthday: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await users_service.getUser();
        setData(res);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const { userName, email, birthday } = data;
      await users_service.update({ userName, email, birthday });
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit}>
      <FormGroup className={styles.form_group}>
        <InputComponent
          type="text"
          id="userName"
          name="userName"
          required={true}
          value={data?.userName}
          onChange={handleInputChange}
          className={styles.input}
        />
        <LabelComponent value={'Nickname'} htmlFor="userName" className={styles.label} />
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <InputComponent
          type="text"
          id="email"
          name="email"
          required={true}
          value={data?.email}
          onChange={handleInputChange}
          className={styles.input}
        />
        <LabelComponent value={'E-mail'} htmlFor="email" className={styles.label} />
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <InputComponent
          type="date"
          id="birthday"
          name="birthday"
          required={true}
          value={data?.birthday ? formatDate(data.birthday) : ''}
          onChange={handleInputChange}
          className={styles.input}
        />
        <LabelComponent value={'Data de Aniversário'} htmlFor="birthday" className={styles.label} />
      </FormGroup>
      <ButtonComponent value={'Salvar alterações'} className={styles.btn} />
    </Form>
  );
};

export default UserData;
