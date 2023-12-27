import styles from '../../styles.module.scss';
import { FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import LabelComponent from '../../../../common/label';
import InputComponent from '../../../../common/input';
import ButtonComponent from '../../../../common/button';
import animes_services from '../../../../../services/animes/animes.service';

const AnimesDelete = () => {
  const [animesId, setAnimesId] = useState<number>();

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (animesId !== undefined) {
        await animes_services.delete(animesId);
        alert(`Anime ${animesId} deletado`);
      }
    } catch (error) {
      console.error('Erro ao excluir o anime:', error);
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleDelete}>
      <FormGroup className={styles.form_group}>
        <LabelComponent value={'Anime ID'} />
        <InputComponent onChange={(e) => setAnimesId(parseInt(e.target.value))} />
      </FormGroup>
      <ButtonComponent value="Deletar anime" className={styles.btn} />
    </Form>
  );
};

export default AnimesDelete;
