import styles from './styles.module.scss';

interface Props {
  value: boolean;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectInput: React.FC<Props> = ({ value, onChange }) => {
  const selectOptions = [
    { value: true, label: 'Sim' },
    { value: false, label: 'Não' },
  ];

  return (
    <select value={value.toString()} onChange={onChange} className={styles.select}>
      {selectOptions.map((option) => (
        <option key={option.value.toString()} value={option.value.toString()}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
