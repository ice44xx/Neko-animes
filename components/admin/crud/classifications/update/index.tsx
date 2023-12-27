import styles from '../../styles.module.scss';
import { FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import classifications_service, {
  Classifications,
} from '../../../../../services/classifications/classifications.service';
import ButtonComponent from '../../../../common/button';
import InputComponent from '../../../../common/input';
import LabelComponent from '../../../../common/label';
import TextAreaComponent from '../../../../common/textarea';

const ClassificationsUpdate = () => {
  const [classification, setClassification] = useState<Classifications>({
    id: '',
    name: '',
    thumbnail: '',
    desc: '',
  });

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await classifications_service.update(Number(classification.id), {
        name: classification.name,
        thumbnail: classification.thumbnail,
        desc: classification.desc,
      });

      setClassification({ id: '', name: '', thumbnail: '', desc: '' });

      alert('Classificação atualizada');
    } catch (error) {
      console.error('Erro ao atualizar classificação:', error);
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleUpdate}>
      <FormGroup className={styles.form_group}>
        <div className={styles.form_group_flex}>
          <div className={styles.form_group_flex_id}>
            <LabelComponent value={'Nome da classificação'} />
            <InputComponent
              value={classification.name}
              onChange={(e) => setClassification({ ...classification, name: e.target.value })}
            />
          </div>
          <div className={styles.form_group_flex_id}>
            <LabelComponent value={'ID da classificação'} />
            <InputComponent
              value={classification.id}
              onChange={(e) => setClassification({ ...classification, id: e.target.value })}
            />
          </div>
        </div>
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <LabelComponent value={'Thumbnail'} />
        <InputComponent
          value={classification.thumbnail}
          onChange={(e) => setClassification({ ...classification, thumbnail: e.target.value })}
        />
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="desc" value={'Descrição'} />
        <TextAreaComponent
          name="desc"
          rows={5}
          value={classification.desc}
          onChange={(e) => setClassification({ ...classification, desc: e.target.value })}
        />
      </FormGroup>
      <ButtonComponent value="Atualizar classificação" className={styles.btn} />
    </Form>
  );
};

export default ClassificationsUpdate;
