import styles from '../../styles.module.scss';
import Swal from 'sweetalert2';
import { FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import LabelComponent from '../../../../common/label';
import InputComponent from '../../../../common/input';
import ButtonComponent from '../../../../common/button';
import categories_service from '../../../../../services/categories/categories.service';

const CategoriesDelete = () => {
  const [categoriesId, setCategoriesId] = useState<number>();

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (categoriesId !== undefined) {
        await categories_service.delete(categoriesId);
        Swal.fire('Sucesso!', 'Categoria deletada com sucesso!', 'success');
      }
    } catch (error: any) {
      Swal.fire('Erro!', `${error.message}`, 'error');
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleDelete}>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="id" value={'Categoria ID'} />
        <InputComponent
          placeholder="Exemplo: 2"
          id="id"
          name="id"
          onChange={(e) => setCategoriesId(parseInt(e.target.value))}
        />
      </FormGroup>
      <ButtonComponent value="Deletar categoria" className={styles.btn} />
    </Form>
  );
};

export default CategoriesDelete;
