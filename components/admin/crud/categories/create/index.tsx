import styles from '../../styles.module.scss';
import { FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import LabelComponent from '../../../../common/label';
import InputComponent from '../../../../common/inputs';
import ButtonComponent from '../../../../common/button';
import categories_service from '../../../../../services/categories/categories.service';

const CategoriesCreate = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const attributes = {
        name: name,
      };

      const res = await categories_service.create(attributes);
      alert('Categoria criada com sucesso!' + JSON.stringify(res));
    } catch (error: any) {
      alert('Erro ao criar categoria: ' + error.message);
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit}>
      <FormGroup className={styles.form_group}>
        <LabelComponent value={'Nome da categoria'} />
        <InputComponent onChange={(e) => setName(e.target.value)} />
      </FormGroup>
      <ButtonComponent value="Criar categoria" className={styles.btn} />
    </Form>
  );
};

export default CategoriesCreate;
