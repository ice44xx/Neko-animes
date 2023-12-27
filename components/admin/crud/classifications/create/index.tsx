import styles from '../../styles.module.scss';
import Swal from 'sweetalert2';
import { FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import classifications_service, {
  Classifications,
} from '../../../../../services/classifications/classifications.service';
import LabelComponent from '../../../../common/label';
import InputComponent from '../../../../common/input';
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
      await classifications_service.create(classification);
      setClassification({ name: '', thumbnail: '', desc: '' });

      Swal.fire('Sucesso!', 'Classificação criada com sucesso!', 'success');
    } catch (error: any) {
      Swal.fire('Erro!', `${error.message}`, 'error');
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit}>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="name" value={'Nome da classificação'} />
        <InputComponent
          placeholder="Exemplo: Seinen"
          id="name"
          name="name"
          onChange={(e) => setClassification({ ...classification, name: e.target.value })}
        />
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="thumbnail" value={'Thumbnail'} />
        <InputComponent
          placeholder="Exemplo: https://res.cloudinary.com/doupbxhfd/image/upload/v1703559298/Classifica%C3%A7%C3%B5es/Shounen_xfflya.webp"
          id="thumbnail"
          name="thumbnail"
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
