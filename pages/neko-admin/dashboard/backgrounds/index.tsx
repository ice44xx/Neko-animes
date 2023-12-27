import styles from '../styles.module.scss';
import Configure from '../../../../components/admin/configure';
import BackgroundsCreate from '../../../../components/admin/crud/backgrounds/create';
import BackgroundsGet from '../../../../components/admin/crud/backgrounds/get';
import BackgroundsUpdate from '../../../../components/admin/crud/backgrounds/update';
import BackgroundsDelete from '../../../../components/admin/crud/backgrounds/delete';

const DashboardBackgrounds = () => {
  const options = ['Buscar', 'Criar', 'Atualizar', 'Deletar'];

  const components = {
    Buscar: BackgroundsGet,
    Criar: BackgroundsCreate,
    Atualizar: BackgroundsUpdate,
    Deletar: BackgroundsDelete,
  };

  return (
    <main>
      <div className={styles.container}>
        <Configure options={options} components={components} />
      </div>
    </main>
  );
};

export default DashboardBackgrounds;
