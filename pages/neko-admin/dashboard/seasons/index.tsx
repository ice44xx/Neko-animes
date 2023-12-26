import Configure from '../../../../components/admin/configure';
import SeasonsCreate from '../../../../components/admin/crud/seasons/create';
import styles from '../styles.module.scss';

const DashboardSeasons = () => {
  const options = ['Buscar', 'Criar', 'Atualizar', 'Deletar'];

  const components = {
    Buscar: SeasonsCreate,
    Criar: SeasonsCreate,
    Atualizar: SeasonsCreate,
    Deletar: SeasonsCreate,
  };

  return (
    <main>
      <div className={styles.container}>
        <Configure options={options} components={components} />
      </div>
    </main>
  );
};

export default DashboardSeasons;
