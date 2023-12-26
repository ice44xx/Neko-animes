import styles from '../../styles.module.scss';
import { FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import LabelComponent from '../../../../common/label';
import InputComponent from '../../../../common/inputs';
import ButtonComponent from '../../../../common/button';
import categories_service from '../../../../../services/categories/categories.service';

const CategoriesDelete = () => {
  const [categoriesId, setCategoriesId] = useState<number>();

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (categoriesId !== undefined) {
        await categories_service.delete(categoriesId);
        alert(`Categoria ${categoriesId} deletada`);
      }
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleDelete}>
      <FormGroup className={styles.form_group}>
        <LabelComponent value={'Categoria ID'} />
        <InputComponent onChange={(e) => setCategoriesId(parseInt(e.target.value))} />
      </FormGroup>
      <ButtonComponent value="Deletar categoria" className={styles.btn} />
    </Form>
  );
};

export default CategoriesDelete;
