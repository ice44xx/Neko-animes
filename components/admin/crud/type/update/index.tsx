import styles from '../../styles.module.scss';
import Swal from 'sweetalert2';
import ButtonComponent from '../../../../common/button';
import InputComponent from '../../../../common/input';
import LabelComponent from '../../../../common/label';
import { FormEvent, useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import types_service, { Types } from '../../../../../services/type/types.service';

const TypesUpdate = () => {
  const [types, setTypes] = useState<Types>({
    id: '',
    name: '',
  });

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await types_service.update(Number(types.id), {
        name: types.name,
      });

      setTypes({ id: '', name: '' });

      Swal.fire('Sucesso!', 'Tipo atualizado com sucesso!', 'success');
    } catch (error: any) {
      Swal.fire('Erro!', `${error.message}`, 'error');
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleUpdate}>
      <FormGroup className={styles.form_group}>
        <div className={styles.form_group_flex}>
          <div className={styles.form_group_flex_d}>
            <LabelComponent htmlFor="name" value={'Nome do tipo'} />
            <InputComponent
              placeholder="Exemplo: Series ou Movies"
              id="name"
              name="name"
              onChange={(e) => setTypes({ ...types, name: e.target.value })}
            />
          </div>
          <div className={styles.form_group_flex_d}>
            <LabelComponent htmlFor="id" value={'ID do tipo'} />
            <InputComponent
              placeholder="Exemplo: 2"
              id="id"
              name="id"
              onChange={(e) => setTypes({ ...types, id: e.target.value })}
            />
          </div>
        </div>
      </FormGroup>
      <ButtonComponent value="Atualizar o tipo" className={styles.btn} />
    </Form>
  );
};

export default TypesUpdate;
