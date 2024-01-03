import styles from '../../styles.module.scss';
import Swal from 'sweetalert2';
import LabelComponent from '../../../../common/label';
import InputComponent from '../../../../common/input';
import ButtonComponent from '../../../../common/button';
import animes_services from '../../../../../services/animes/animes.service';
import { FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';

const AnimesDelete = () => {
  const [animesId, setAnimesId] = useState<number>();

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (animesId !== undefined) {
        await animes_services.delete(animesId);
        Swal.fire('Sucesso!', 'Anime criado com sucesso!', 'success');
      }
    } catch (error: any) {
      Swal.fire('Erro!', `${error.message}`, 'error');
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleDelete}>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="id" value={'Anime ID'} />
        <InputComponent
          placeholder="Exemplo: 2"
          id="id"
          name="id"
          onChange={(e) => setAnimesId(parseInt(e.target.value))}
        />
      </FormGroup>
      <ButtonComponent value="Deletar anime" className={styles.btn} />
    </Form>
  );
};

export default AnimesDelete;
