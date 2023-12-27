import styles from '../../styles.module.scss';
import Swal from 'sweetalert2';
import { FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import LabelComponent from '../../../../common/label';
import InputComponent from '../../../../common/input';
import ButtonComponent from '../../../../common/button';
import episodes_service from '../../../../../services/episodes/episodes.service';

const EpisodesDelete = () => {
  const [episodesId, setEpisodesId] = useState<number>();

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (episodesId !== undefined) {
        await episodes_service.delete(episodesId);
        Swal.fire('Sucesso!', 'Episódio deletado com sucesso!', 'success');
      }
    } catch (error: any) {
      Swal.fire('Erro!', `${error.message}`, 'error');
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleDelete}>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="id" value={'Episódio ID'} />
        <InputComponent
          placeholder="Exemplo: 2"
          id="id"
          name="id"
          onChange={(e) => setEpisodesId(parseInt(e.target.value))}
        />
      </FormGroup>
      <ButtonComponent value="Deletar episódio" className={styles.btn} />
    </Form>
  );
};

export default EpisodesDelete;
