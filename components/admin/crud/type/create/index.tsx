import styles from '../../styles.module.scss';
import Swal from 'sweetalert2';
import LabelComponent from '../../../../common/label';
import InputComponent from '../../../../common/input';
import TextAreaComponent from '../../../../common/textarea';
import ButtonComponent from '../../../../common/button';
import { FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import types_service, { Types } from '../../../../../services/type/types.service';

const TypesCreate = () => {
  const [types, setTypes] = useState<Types>({
    name: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      await types_service.create(types);
      setTypes({ name: '' });

      Swal.fire('Sucesso!', 'Tipo criado com sucesso!', 'success');
    } catch (error: any) {
      Swal.fire('Erro!', `${error.message}`, 'error');
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit}>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="name" value={'Nome do tipo'} />
        <InputComponent
          placeholder="Exemplo: Series ou Movies"
          id="name"
          name="name"
          onChange={(e) => setTypes({ ...types, name: e.target.value })}
        />
      </FormGroup>
      <ButtonComponent value="Criar tipo" className={styles.btn} />
    </Form>
  );
};

export default TypesCreate;
