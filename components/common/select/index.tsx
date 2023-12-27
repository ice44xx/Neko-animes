import styles from './styles.module.scss';

interface Props {
  value: boolean | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  optionsType: 'feature' | 'user';
}

const SelectInput: React.FC<Props> = ({ value, onChange, optionsType }) => {
  let selectOptions: { value: boolean | number; label: string }[] = [];

  if (optionsType === 'feature') {
    selectOptions = [
      { value: true, label: 'Sim' },
      { value: false, label: 'Não' },
    ];
  } else if (optionsType === 'user') {
    selectOptions = [
      { value: 1, label: 'User' },
      { value: 2, label: 'Admin' },
    ];
  }

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
