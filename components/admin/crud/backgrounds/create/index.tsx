import styles from '../../styles.module.scss';
import Swal from 'sweetalert2';
import LabelComponent from '../../../../common/label';
import InputComponent from '../../../../common/input';
import ButtonComponent from '../../../../common/button';
import { FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import backgrounds_service, {
  Backgrounds,
} from '../../../../../services/backgrounds/backgrounds.service';

const BackgroundsCreate = () => {
  const [background, setBackground] = useState<Backgrounds>({
    url: '',
    order: 0,
  });

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      await backgrounds_service.create(background);
      setBackground({ url: '', order: 0 });

      Swal.fire('Sucesso!', 'Background criado com sucesso!', 'success');
    } catch (error: any) {
      Swal.fire('Erro!', `${error.message}`, 'error');
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit}>
      <FormGroup className={styles.form_group}>
        <div className={styles.form_group_flex}>
          <div className={styles.form_group_flex_d}>
            <LabelComponent htmlFor="url" value={'Background URL'} />
            <InputComponent
              placeholder="Exemplo: https://res.cloudinary.com/doupbxhfd/image/upload/v1703559297/Classifica%C3%A7%C3%B5es/Seinen_zwjfhg.webp"
              id="url"
              name="url"
              onChange={(e) => setBackground({ ...background, url: e.target.value })}
            />
          </div>
          <div className={styles.form_group_flex_id}>
            <LabelComponent htmlFor="order" value={'Ordem'} />
            <InputComponent
              placeholder="Example: 2"
              id="order"
              name="order"
              onChange={(e) => setBackground({ ...background, order: parseInt(e.target.value) })}
            />
          </div>
        </div>
      </FormGroup>
      <ButtonComponent value="Criar background" className={styles.btn} />
    </Form>
  );
};

export default BackgroundsCreate;
