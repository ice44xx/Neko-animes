import { ChangeEvent } from 'react';
import InputComponent from '../../common/input';
import styles from './styles.module.scss';
import { Form } from 'reactstrap';

interface Props {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchAdmin: React.FC<Props> = ({ onChange, placeholder }) => {
  return (
    <div className={styles.container}>
      <Form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <InputComponent placeholder={placeholder} onChange={onChange} className={styles.input} />
      </Form>
    </div>
  );
};

export default SearchAdmin;
