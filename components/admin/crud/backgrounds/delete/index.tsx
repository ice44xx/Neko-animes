import styles from '../../styles.module.scss';
import Swal from 'sweetalert2';
import { FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import LabelComponent from '../../../../common/label';
import InputComponent from '../../../../common/input';
import ButtonComponent from '../../../../common/button';
import seasons_service from '../../../../../services/seasons/seasons.service';

const BackgroundsDelete = () => {
  const [backgroundId, setBackgroundId] = useState<number>();

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (backgroundId !== undefined) {
        await seasons_service.delete(backgroundId);
        Swal.fire('Sucesso!', 'Background deletado com sucesso!', 'success');
      }
    } catch (error: any) {
      Swal.fire('Error!', `${error.message}`, 'error');
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleDelete}>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="id" value={'Background ID'} />
        <InputComponent
          placeholder="Exemplo: 2"
          id="id"
          name="id"
          onChange={(e) => setBackgroundId(parseInt(e.target.value))}
        />
      </FormGroup>
      <ButtonComponent value="Deletar background" className={styles.btn} />
    </Form>
  );
};

export default BackgroundsDelete;
