import styles from '../../styles.module.scss';
import Swal from 'sweetalert2';
import LabelComponent from '../../../../common/label';
import InputComponent from '../../../../common/input';
import ButtonComponent from '../../../../common/button';
import { FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import types_service from '../../../../../services/types-animes/types.service';

const TypesDelete = () => {
  const [typesId, setTypesId] = useState<number>();

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (typesId !== undefined) {
        await types_service.delete(typesId);
        Swal.fire('Sucesso!', 'Tipo deletada com sucesso!', 'success');
      }
    } catch (error: any) {
      Swal.fire('Erro!', `${error.message}`, 'error');
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleDelete}>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="id" value={'Tipo ID'} />
        <InputComponent
          placeholder="Exemplo: 2"
          id="id"
          name="id"
          onChange={(e) => setTypesId(parseInt(e.target.value))}
        />
      </FormGroup>
      <ButtonComponent value="Deletar tipo" className={styles.btn} />
    </Form>
  );
};

export default TypesDelete;
