import styles from '../../styles.module.scss';
import { FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import categories_service, {
  Categories,
} from '../../../../../services/categories/categories.service';
import ButtonComponent from '../../../../common/button';
import InputComponent from '../../../../common/input';
import LabelComponent from '../../../../common/label';

const CategoriessUpdate = () => {
  const [categories, setCategories] = useState<Categories>({
    id: '',
    name: '',
  });

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await categories_service.update(Number(categories.id), {
        name: categories.name,
      });

      setCategories({ id: '', name: '' });

      alert('Categoria atualizada');
    } catch (error) {
      console.error('Erro ao atualizar a categoria:', error);
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleUpdate}>
      <FormGroup className={styles.form_group}>
        <div className={styles.form_group_flex}>
          <div className={styles.form_group_flex_id}>
            <LabelComponent htmlFor="name" value={'Nome da categoria'} />
            <InputComponent
              id="name"
              name="name"
              value={categories.name}
              onChange={(e) => setCategories({ ...categories, name: e.target.value })}
            />
          </div>
          <div className={styles.form_group_flex_id}>
            <LabelComponent htmlFor="id" value={'ID da categoria'} />
            <InputComponent
              id="id"
              name="id"
              value={categories.id}
              onChange={(e) => setCategories({ ...categories, id: e.target.value })}
            />
          </div>
        </div>
      </FormGroup>
      <ButtonComponent value="Atualizar categoria" className={styles.btn} />
    </Form>
  );
};

export default CategoriessUpdate;
