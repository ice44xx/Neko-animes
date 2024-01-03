import styles from '../../styles.module.scss';
import Swal from 'sweetalert2';
import LabelComponent from '../../../../common/label';
import InputComponent from '../../../../common/input';
import ButtonComponent from '../../../../common/button';
import { Form, FormGroup } from 'reactstrap';
import roles_service, { Roles } from '../../../../../services/roles/roles.service';
import { FormEvent, useState } from 'react';

const RolesCreate = () => {
  const [roles, setRoles] = useState<Roles>({
    name: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      await roles_service.createAdmin(roles);
      setRoles({ name: '' });

      Swal.fire('Sucesso!', 'Role criada com sucesso!', 'success');
    } catch (error: any) {
      Swal.fire('Erro!', `${error.message}`, 'error');
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit}>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="name" value={'Role'} />
        <InputComponent
          placeholder="Exemplo: admin "
          id="name"
          name="name"
          onChange={(e) => setRoles({ ...roles, name: e.target.value })}
        />
      </FormGroup>

      <ButtonComponent value="Criar role" className={styles.btn} />
    </Form>
  );
};

export default RolesCreate;
