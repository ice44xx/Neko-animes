import styles from '../../styles.module.scss';
import Swal from 'sweetalert2';
import { FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import LabelComponent from '../../../../common/label';
import InputComponent from '../../../../common/input';
import ButtonComponent from '../../../../common/button';
import users_service from '../../../../../services/users/users.service';

const UsersDelete = () => {
  const [usersId, setUsersId] = useState<number>();

  const handleDelete = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (usersId !== undefined) {
        await users_service.deleteAdmin(usersId);
        Swal.fire('Sucesso!', 'Usuário deletado com sucesso!', 'success');
      }
    } catch (error: any) {
      Swal.fire('Erro!', `${error.message}`, 'error');
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleDelete}>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="id" value={'Usuário ID'} />
        <InputComponent
          placeholder="Exemplo: 2"
          id="id"
          name="id"
          onChange={(e) => setUsersId(parseInt(e.target.value))}
        />
      </FormGroup>
      <ButtonComponent value="Deletar usuário" className={styles.btn} />
    </Form>
  );
};

export default UsersDelete;
