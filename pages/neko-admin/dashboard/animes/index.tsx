import styles from '../styles.module.scss';
import AnimesCreate from '../../../../components/admin/crud/animes/create';
import Configure from '../../../../components/admin/configure';

const DashboardAnimes = () => {
  const options = ['Buscar', 'Criar', 'Atualizar', 'Deletar'];

  const components = {
    Buscar: AnimesCreate,
    Criar: AnimesCreate,
    Atualizar: AnimesCreate,
    Deletar: AnimesCreate,
  };

  return (
    <main>
      <div className={styles.container}>
        <Configure options={options} components={components} />
      </div>
    </main>
  );
};

export default DashboardAnimes;
