import styles from '../../styles.module.scss';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import users_service, { AdminsUpdate } from '../../../../../services/users/users.service';
import ButtonComponent from '../../../../common/button';
import InputComponent from '../../../../common/input';
import LabelComponent from '../../../../common/label';
import SelectInput from '../../../../common/select';

const UsersUpdate = () => {
  const [users, setUsers] = useState<AdminsUpdate>({
    id: '',
    firstName: '',
    userName: '',
    profile: '',
    email: '',
    roleId: 1,
    birthday: '',
  });

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await users_service.updateAdmin(Number(users.id), {
        firstName: users.firstName,
        userName: users.userName,
        email: users.email,
        roleId: users.roleId,
        profile: users.profile,
        birthday: users.birthday,
      });

      setUsers({ firstName: '', userName: '', email: '', roleId: 1, profile: '', birthday: '' });

      alert('Usuário atualizado');
    } catch (error) {
      console.error('Erro ao atualizar o usuário:', error);
    }
  };

  const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setUsers({ ...users, roleId: parseInt(e.target.value) });
  };

  return (
    <Form className={styles.form} onSubmit={handleUpdate}>
      <FormGroup className={styles.form_group}>
        <div className={styles.form_group_flex}>
          <div className={styles.form_group_flex_d}>
            <LabelComponent htmlFor="name" value={'Nome'} />
            <InputComponent
              id="name"
              name="name"
              onChange={(e) => setUsers({ ...users, firstName: e.target.value })}
            />
          </div>
          <div className={styles.form_group_flex_id}>
            <LabelComponent htmlFor="id" value={'ID do usuário'} />
            <InputComponent
              id="id"
              name="id"
              onChange={(e) => setUsers({ ...users, id: parseInt(e.target.value) })}
            />
          </div>
        </div>
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <div className={styles.form_group_flex}>
          <div className={styles.form_group_flex_d}>
            <LabelComponent htmlFor="email" value={'Email'} />
            <InputComponent
              type="email"
              id="email"
              name="email"
              onChange={(e) => setUsers({ ...users, email: e.target.value })}
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
        <LabelComponent htmlFor="profile" value={'Profile'} />
        <InputComponent
          id="profile"
          name="profile"
          onChange={(e) => setUsers({ ...users, profile: e.target.value })}
        />
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <div className={styles.form_group_flex}>
          <div className={styles.form_group_flex_d}>
            <LabelComponent htmlFor="birthday" value={'Data de aniversário'} />
            <InputComponent
              type="date"
              id="birthday"
              name="birthday"
              onChange={(e) => setUsers({ ...users, birthday: e.target.value })}
            />
          </div>
          <div className={styles.form_group_flex_d}>
            <LabelComponent htmlFor="roleId" value={'Role'} />
            <SelectInput value={users.roleId} optionsType="user" onChange={handleRoleChange} />
          </div>
        </div>
      </FormGroup>
      <ButtonComponent value="Atualizar usuário" className={styles.btn} />
    </Form>
  );
};

export default UsersUpdate;
