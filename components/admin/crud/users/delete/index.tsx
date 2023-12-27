import styles from '../../styles.module.scss';
import { FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import LabelComponent from '../../../../common/label';
import InputComponent from '../../../../common/input';
import ButtonComponent from '../../../../common/button';
import users_service from '../../../../../services/users/users.service';

const UsersDelete = () => {
  const [usersId, setUsersId] = useState<number>();

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (usersId !== undefined) {
        await users_service.delete(usersId);
        alert(`Usuário ${usersId} deletado`);
      }
    } catch (error) {
      console.error('Erro ao excluir o usuário:', error);
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleDelete}>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="id" value={'Usuário ID'} />
        <InputComponent id="id" name="id" onChange={(e) => setUsersId(parseInt(e.target.value))} />
      </FormGroup>
      <ButtonComponent value="Deletar usuário" className={styles.btn} />
    </Form>
  );
};

export default UsersDelete;
