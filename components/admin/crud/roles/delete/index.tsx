import styles from '../../styles.module.scss';
import Swal from 'sweetalert2';
import LabelComponent from '../../../../common/label';
import InputComponent from '../../../../common/input';
import ButtonComponent from '../../../../common/button';
import { FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import roles_service from '../../../../../services/roles/roles.service';

const RolesDelete = () => {
  const [roleId, setRoleId] = useState<number>();

  const handleDelete = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (roleId !== undefined) {
        await roles_service.deleteAdmin(roleId);
        Swal.fire('Sucesso!', 'Role deletada com sucesso!', 'success');
      }
    } catch (error: any) {
      Swal.fire('Erro!', `${error.message}`, 'error');
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleDelete}>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="id" value={'Role ID'} />
        <InputComponent
          placeholder="Exemplo: 2"
          id="id"
          name="id"
          onChange={(e) => setRoleId(parseInt(e.target.value))}
        />
      </FormGroup>
      <ButtonComponent value="Deletar role" className={styles.btn} />
    </Form>
  );
};

export default RolesDelete;
