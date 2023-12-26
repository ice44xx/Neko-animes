import { ChangeEvent } from 'react';
import styles from './styles.module.scss';

interface Props {
  name: string;
  rows: number;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
}

const TextAreaComponent: React.FC<Props> = ({ name, rows, onChange, value }) => {
  return (
    <textarea
      name={name}
      rows={rows}
      value={value}
      className={styles.textarea}
      onChange={onChange}
    />
  );
};

export default TextAreaComponent;
