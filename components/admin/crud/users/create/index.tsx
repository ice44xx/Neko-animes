import styles from '../../styles.module.scss';
import Swal from 'sweetalert2';
import LabelComponent from '../../../../common/label';
import InputComponent from '../../../../common/input';
import ButtonComponent from '../../../../common/button';
import SelectInput from '../../../../common/select';
import users_service, { AdminsCreate } from '../../../../../services/users/users.service';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';

const UsersCreate = () => {
  const [users, setUsers] = useState<AdminsCreate>({
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
      setUsers({ userName: '', email: '', birthday: '', password: '', roleId: 0 });

      Swal.fire('Sucesso!', 'Usuário criado com sucesso!', 'success');
    } catch (error: any) {
      Swal.fire('Erro!', `${error.message}`, 'error');
    }
  };

  const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setUsers({ ...users, roleId: parseInt(e.target.value) });
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit}>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="userName" value={'Nickname'} />
        <InputComponent
          placeholder="Exemplo: Neko "
          id="userName"
          name="userName"
          onChange={(e) => setUsers({ ...users, userName: e.target.value })}
        />
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="email" value={'Email'} />
        <InputComponent
          placeholder="Exemplo: neko@gmail.com"
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
