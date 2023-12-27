import styles from '../../styles.module.scss';
import Swal from 'sweetalert2';
import { FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import LabelComponent from '../../../../common/label';
import InputComponent from '../../../../common/input';
import ButtonComponent from '../../../../common/button';
import seasons_service from '../../../../../services/seasons/seasons.service';

const SeasonsDelete = () => {
  const [seasonsId, setSeasonsId] = useState<number>();

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (seasonsId !== undefined) {
        await seasons_service.delete(seasonsId);
        Swal.fire('Sucesso!', 'Temporada deletada com sucesso!', 'success');
      }
    } catch (error: any) {
      Swal.fire('Erro!', `${error.message}`, 'error');
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleDelete}>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="id" value={'Temporada ID'} />
        <InputComponent
          placeholder="Exemplo: 2"
          id="id"
          name="id"
          onChange={(e) => setSeasonsId(parseInt(e.target.value))}
        />
      </FormGroup>
      <ButtonComponent value="Deletar temporada" className={styles.btn} />
    </Form>
  );
};

export default SeasonsDelete;
