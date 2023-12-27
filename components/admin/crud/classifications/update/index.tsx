import styles from '../../styles.module.scss';
import Swal from 'sweetalert2';
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

      Swal.fire('Sucesso!', 'Classificação atualizada com sucesso!', 'success');
    } catch (error: any) {
      Swal.fire('Erro!', `${error.message}`, 'error');
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleUpdate}>
      <FormGroup className={styles.form_group}>
        <div className={styles.form_group_flex}>
          <div className={styles.form_group_flex_id}>
            <LabelComponent htmlFor="name" value={'Nome da classificação'} />
            <InputComponent
              placeholder="Exemplo: Seinen"
              id="name"
              name="name"
              onChange={(e) => setClassification({ ...classification, name: e.target.value })}
            />
          </div>
          <div className={styles.form_group_flex_id}>
            <LabelComponent htmlFor="id" value={'ID da classificação'} />
            <InputComponent
              placeholder="Exemplo: 2"
              id="id"
              name="id"
              onChange={(e) => setClassification({ ...classification, id: e.target.value })}
            />
          </div>
        </div>
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="thumbnail" value={'Thumbnail'} />
        <InputComponent
          placeholder="Exemplo: https://res.cloudinary.com/doupbxhfd/image/upload/v1703559298/Classifica%C3%A7%C3%B5es/Shounen_xfflya.webp"
          id="thumbnail"
          name="thumbnail"
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
