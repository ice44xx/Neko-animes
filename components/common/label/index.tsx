import styles from './styles.module.scss';
import { Label } from 'reactstrap';

interface Props {
  htmlFor?: string;
  value?: React.ReactNode;
  className?: string;
}

const LabelComponent: React.FC<Props> = ({ htmlFor, value, className }) => {
  const combinedClassName = className ? `${styles.label} ${className}` : styles.label;
  return (
    <Label htmlFor={htmlFor} className={combinedClassName}>
      {value}
    </Label>
  );
};

export default LabelComponent;
