import { Button } from 'reactstrap';
import styles from './styles.module.scss';

interface ButtonProps {
  value: string;
  className?: string;
}
const ButtonComponent: React.FC<ButtonProps> = ({ value, className }) => {
  const combinedClassName = className ? `${styles.button} ${className}` : styles.button;
  return <Button className={combinedClassName}>{value}</Button>;
};

export default ButtonComponent;
