import styles from '../../styles.module.scss';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import users_service, { AdminsCreate } from '../../../../../services/users/users.service';
import LabelComponent from '../../../../common/label';
import InputComponent from '../../../../common/input';
import ButtonComponent from '../../../../common/button';
import SelectInput from '../../../../common/select';

const UsersCreate = () => {
  const [users, setUsers] = useState<AdminsCreate>({
    firstName: '',
    userName: '',
    email: '',
    birthday: '',
    password: '',
    roleId: 1,
  });

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      const res = await users_service.createAdmin(users);
      setUsers({ firstName: '', userName: '', email: '', birthday: '', password: '', roleId: 0 });

      alert('Usuário criado com sucesso!' + JSON.stringify(res));
    } catch (error: any) {
      alert('Erro ao criar usuário: ' + error.message);
    }
  };

  const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setUsers({ ...users, roleId: parseInt(e.target.value) });
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit}>
      <FormGroup className={styles.form_group}>
        <div className={styles.form_group_flex}>
          <div className={styles.form_group_flex_d}>
            <LabelComponent htmlFor="firstName" value={'Nome'} />
            <InputComponent
              id="firstName"
              name="firstName"
              onChange={(e) => setUsers({ ...users, firstName: e.target.value })}
            />
          </div>
          <div className={styles.form_group_flex_d}>
            <LabelComponent htmlFor="userName" value={'Nickname'} />
            <InputComponent
              id="userName"
              name="userName"
              onChange={(e) => setUsers({ ...users, userName: e.target.value })}
            />
          </div>
        </div>
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="email" value={'Email'} />
        <InputComponent
          id="email"
          name="email"
          onChange={(e) => setUsers({ ...users, email: e.target.value })}
        />
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <div className={styles.form_group_flex}>
          <div className={styles.form_group_flex_d}>
            <LabelComponent htmlFor="password" value={'Senha'} />
            <InputComponent
              type="password"
              id="password"
              name="password"
              onChange={(e) => setUsers({ ...users, password: e.target.value })}
            />
          </div>
          <div className={styles.form_group_flex_id}>
            <LabelComponent htmlFor="birthday" value={'Data de aniversário'} />
            <InputComponent
              type="date"
              id="birthday"
              name="birthday"
              onChange={(e) => setUsers({ ...users, birthday: e.target.value })}
            />
          </div>
          <div className={styles.form_group_flex_id}>
            <LabelComponent htmlFor="roleId" value={'Role'} />
            <SelectInput value={users.roleId} optionsType="user" onChange={handleRoleChange} />
          </div>
        </div>
      </FormGroup>
      <ButtonComponent value="Criar usuário" className={styles.btn} />
    </Form>
  );
};

export default UsersCreate;
