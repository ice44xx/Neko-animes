import styles from './styles.module.scss';
import React, { ChangeEvent } from 'react';
import { Input } from 'reactstrap';

interface InputProps {
  name?: string;
  id?: string;
  value?: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const InputComponent: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  id,
  name,
  className,
}) => {
  const combinedClassName = className ? `${styles.input} ${className}` : styles.input;
  return (
    <Input
      value={value}
      id={id}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      className={combinedClassName}
    />
  );
};

export default InputComponent;
