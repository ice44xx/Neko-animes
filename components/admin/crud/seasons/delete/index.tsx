import styles from '../../styles.module.scss';
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
        alert(`Temporada ${seasonsId} deletada`);
      }
    } catch (error) {
      console.error('Erro ao excluir temporada:', error);
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleDelete}>
      <FormGroup className={styles.form_group}>
        <LabelComponent value={'Temporada ID'} />
        <InputComponent onChange={(e) => setSeasonsId(parseInt(e.target.value))} />
      </FormGroup>
      <ButtonComponent value="Deletar temporada" className={styles.btn} />
    </Form>
  );
};

export default SeasonsDelete;
