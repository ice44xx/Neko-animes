import styles from '../../styles.module.scss';
import Swal from 'sweetalert2';
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
      await categories_service.create(categories);
      setCategories({ name: '' });

      Swal.fire('Sucesso!', 'Categoria criada com sucesso!', 'success');
    } catch (error: any) {
      Swal.fire('Erro!', `${error.message}`, 'error');
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit}>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="name" value={'Nome da categoria'} />
        <InputComponent
          placeholder="Exemplo: aventura"
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
