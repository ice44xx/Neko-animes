import styles from '../../styles.module.scss';
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
        alert(`Episódio ${episodesId} deletado`);
      }
    } catch (error) {
      console.error('Erro ao excluir o episódio:', error);
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleDelete}>
      <FormGroup className={styles.form_group}>
        <LabelComponent value={'Episódio ID'} />
        <InputComponent onChange={(e) => setEpisodesId(parseInt(e.target.value))} />
      </FormGroup>
      <ButtonComponent value="Deletar episódio" className={styles.btn} />
    </Form>
  );
};

export default EpisodesDelete;
