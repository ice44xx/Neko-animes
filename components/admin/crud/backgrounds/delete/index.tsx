import styles from '../../styles.module.scss';
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
        alert(`Background ${backgroundId} deletado`);
      }
    } catch (error) {
      console.error('Erro ao excluir background:', error);
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleDelete}>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="id" value={'Background ID'} />
        <InputComponent
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
