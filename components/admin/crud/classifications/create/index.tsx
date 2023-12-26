import styles from '../../styles.module.scss';
import { FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import classifications_service, {
  Classifications,
} from '../../../../../services/classifications/classifications.service';
import LabelComponent from '../../../../common/label';
import InputComponent from '../../../../common/inputs';
import TextAreaComponent from '../../../../common/textarea';
import ButtonComponent from '../../../../common/button';

const ClassificationsCreate = () => {
  const [classification, setClassification] = useState<Classifications>({
    name: '',
    thumbnail: '',
    desc: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const res = await classifications_service.create(classification);
      setClassification({ name: '', thumbnail: '', desc: '' });

      alert('Classificação criada com sucesso!' + JSON.stringify(res));
    } catch (error: any) {
      alert('Erro ao criar classificação: ' + error.message);
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit}>
      <FormGroup className={styles.form_group}>
        <LabelComponent value={'Nome da classificação'} />
        <InputComponent
          onChange={(e) => setClassification({ ...classification, name: e.target.value })}
        />
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <LabelComponent value={'Thumbnail'} />
        <InputComponent
          onChange={(e) => setClassification({ ...classification, thumbnail: e.target.value })}
        />
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="desc" value={'Descrição'} />
        <TextAreaComponent
          name="desc"
          rows={5}
          onChange={(e) => setClassification({ ...classification, desc: e.target.value })}
        />
      </FormGroup>
      <ButtonComponent value="Criar classificação" className={styles.btn} />
    </Form>
  );
};

export default ClassificationsCreate;
