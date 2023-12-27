import styles from '../../styles.module.scss';
import Swal from 'sweetalert2';
import { FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import ButtonComponent from '../../../../common/button';
import InputComponent from '../../../../common/input';
import LabelComponent from '../../../../common/label';
import backgrounds_service, {
  Backgrounds,
} from '../../../../../services/backgrounds/backgrounds.service';

const BackgroundsUpdate = () => {
  const [backgrounds, setBackgrounds] = useState<Backgrounds>({
    id: '',
    url: '',
    order: 0,
  });

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await backgrounds_service.update(Number(backgrounds.id), {
        url: backgrounds.url,
        order: backgrounds.order,
      });

      setBackgrounds({ url: '', order: 0 });

      Swal.fire('Sucesso!', 'Background atualizado com sucesso!', 'success');
    } catch (error: any) {
      Swal.fire('Error!', `${error.message}`, 'error');
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleUpdate}>
      <FormGroup className={styles.form_group}>
        <div className={styles.form_group_flex}>
          <div className={styles.form_group_flex_d}>
            <LabelComponent htmlFor="url" value={'Background URL'} />
            <InputComponent
              placeholder="Exemplo: https://res.cloudinary.com/doupbxhfd/image/upload/v1703559297/Classifica%C3%A7%C3%B5es/Seinen_zwjfhg.webp"
              id="url"
              name="url"
              onChange={(e) => setBackgrounds({ ...backgrounds, url: e.target.value })}
            />
          </div>
          <div className={styles.form_group_flex_id}>
            <LabelComponent htmlFor="id" value={'ID do background'} />
            <InputComponent
              placeholder="Exemplo: 2"
              id="id"
              name="id"
              onChange={(e) => setBackgrounds({ ...backgrounds, id: parseInt(e.target.value) })}
            />
          </div>
        </div>
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="order" value={'Ordem'} />
        <InputComponent
          placeholder="Example: 2"
          id="order"
          name="order"
          onChange={(e) => setBackgrounds({ ...backgrounds, order: parseInt(e.target.value) })}
        />
      </FormGroup>
      <ButtonComponent value="Atualizar background" className={styles.btn} />
    </Form>
  );
};

export default BackgroundsUpdate;
