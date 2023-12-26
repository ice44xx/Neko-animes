import { Button } from 'reactstrap';
import styles from './styles.module.scss';

interface ButtonProps {
  value: string;
  className?: string;
  onClick?: () => void;
}
const ButtonComponent: React.FC<ButtonProps> = ({ value, className, onClick }) => {
  const combinedClassName = className ? `${styles.button} ${className}` : styles.button;
  return (
    <Button type="submit" className={combinedClassName} onClick={onClick}>
      {value}
    </Button>
  );
};

export default ButtonComponent;
