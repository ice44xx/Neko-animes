import styles from '../../styles.module.scss';
import { FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import LabelComponent from '../../../../common/label';
import InputComponent from '../../../../common/input';
import ButtonComponent from '../../../../common/button';
import classifications_service from '../../../../../services/classifications/classifications.service';

const ClassificationsDelete = () => {
  const [classificationId, setClassificationId] = useState<number>();

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (classificationId !== undefined) {
        await classifications_service.delete(classificationId);
        alert(`Classificação ${classificationId} deletada`);
      }
    } catch (error) {
      console.error('Erro ao excluir classificação:', error);
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleDelete}>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="id" value={'Classificação ID'} />
        <InputComponent
          id="id"
          name="id"
          onChange={(e) => setClassificationId(parseInt(e.target.value))}
        />
      </FormGroup>
      <ButtonComponent value="Deletar classificação" className={styles.btn} />
    </Form>
  );
};

export default ClassificationsDelete;
