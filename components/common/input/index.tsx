import styles from './styles.module.scss';
import React, { ChangeEvent } from 'react';
import { Input } from 'reactstrap';

interface Props {
  name?: string;
  id?: string;
  value?: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  type?: 'text' | 'number' | 'password' | 'email' | 'date';
}

const InputComponent: React.FC<Props> = ({
  value,
  onChange,
  placeholder,
  id,
  name,
  type,
  required,
  className,
}) => {
  const combinedClassName = className ? `${styles.input} ${className}` : styles.input;
  return (
    <Input
      type={type}
      value={value}
      id={id}
      name={name}
      required={required}
      onChange={onChange}
      placeholder={placeholder}
      className={combinedClassName}
    />
  );
};

export default InputComponent;
