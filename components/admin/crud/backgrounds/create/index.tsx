import styles from '../../styles.module.scss';
import { FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import backgrounds_service, {
  Backgrounds,
} from '../../../../../services/backgrounds/backgrounds.service';
import LabelComponent from '../../../../common/label';
import InputComponent from '../../../../common/input';
import ButtonComponent from '../../../../common/button';

const BackgroundsCreate = () => {
  const [background, setBackground] = useState<Backgrounds>({
    url: '',
    order: 0,
  });

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const res = await backgrounds_service.create(background);
      setBackground({ url: '', order: 0 });

      alert('Background criado com sucesso!' + JSON.stringify(res));
    } catch (error: any) {
      alert('Erro ao criar o background: ' + error.message);
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit}>
      <FormGroup className={styles.form_group}>
        <div className={styles.form_group_flex}>
          <div className={styles.form_group_flex_d}>
            <LabelComponent htmlFor="url" value={'Background URL'} />
            <InputComponent
              id="url"
              name="url"
              onChange={(e) => setBackground({ ...background, url: e.target.value })}
            />
          </div>
          <div className={styles.form_group_flex_id}>
            <LabelComponent htmlFor="order" value={'Ordem'} />
            <InputComponent
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
