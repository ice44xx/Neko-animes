import styles from '../../styles.module.scss';
import Swal from 'sweetalert2';
import ButtonComponent from '../../../../common/button';
import InputComponent from '../../../../common/input';
import LabelComponent from '../../../../common/label';
import SelectInput from '../../../../common/select';
import users_service, { AdminsUpdate } from '../../../../../services/users/users.service';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';

const UsersUpdate = () => {
  const [users, setUsers] = useState<AdminsUpdate>({
    id: '',
    userName: '',
    profile: '',
    email: '',
    roleId: 1,
    birthday: '',
  });

  const handleUpdate = async (e: FormEvent) => {
    try {
      e.preventDefault();
      await users_service.updateAdmin(Number(users.id), {
        userName: users.userName,
        email: users.email,
        roleId: users.roleId,
        profile: users.profile,
        birthday: users.birthday,
      });

      setUsers({ userName: '', email: '', roleId: 1, profile: '', birthday: '' });

      Swal.fire('Sucesso!', 'Usuário atualizado com sucesso!', 'success');
    } catch (error: any) {
      Swal.fire('Erro!', `${error.message}`, 'error');
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
            <LabelComponent htmlFor="userName" value={'Nickname'} />
            <InputComponent
              placeholder="Exemplo: Neko "
              id="userName"
              name="userName"
              onChange={(e) => setUsers({ ...users, userName: e.target.value })}
            />
          </div>
          <div className={styles.form_group_flex_id}>
            <LabelComponent htmlFor="id" value={'ID do usuário'} />
            <InputComponent
              placeholder="Exemplo: 2"
              id="id"
              name="id"
              onChange={(e) => setUsers({ ...users, id: parseInt(e.target.value) })}
            />
          </div>
        </div>
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="email" value={'Email'} />
        <InputComponent
          placeholder="Exemplo: neko@gmail.com"
          type="email"
          id="email"
          name="email"
          onChange={(e) => setUsers({ ...users, email: e.target.value })}
        />
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="profile" value={'Profile'} />
        <InputComponent
          placeholder="Exemplo: https://res.cloudinary.com/doupbxhfd/image/upload/v1703559298/Classifica%C3%A7%C3%B5es/Shounen_xfflya.webp"
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
