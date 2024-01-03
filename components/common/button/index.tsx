import { Button } from 'reactstrap';
import styles from './styles.module.scss';

interface ButtonProps {
  value: string | number;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}
const ButtonComponent: React.FC<ButtonProps> = ({ value, className, disabled, onClick }) => {
  const combinedClassName = className ? `${styles.button} ${className}` : styles.button;
  return (
    <Button type="submit" disabled={disabled} className={combinedClassName} onClick={onClick}>
      {value}
    </Button>
  );
};

export default ButtonComponent;
