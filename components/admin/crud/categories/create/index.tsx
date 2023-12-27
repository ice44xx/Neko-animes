import styles from '../../styles.module.scss';
import { FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import categories_service, {
  Categories,
} from '../../../../../services/categories/categories.service';
import LabelComponent from '../../../../common/label';
import InputComponent from '../../../../common/input';
import ButtonComponent from '../../../../common/button';

const CategoriesCreate = () => {
  const [categories, setCategories] = useState<Categories>({
    name: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const res = await categories_service.create(categories);
      setCategories({ name: '' });

      alert('Background criado com sucesso!' + JSON.stringify(res));
    } catch (error: any) {
      alert('Erro ao criar o background: ' + error.message);
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit}>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="name" value={'Nome da categoria'} />
        <InputComponent
          id="name"
          name="name"
          onChange={(e) => setCategories({ ...categories, name: e.target.value })}
        />
      </FormGroup>
      <ButtonComponent value="Criar categoria" className={styles.btn} />
    </Form>
  );
};

export default CategoriesCreate;
