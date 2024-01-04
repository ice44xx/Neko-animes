import styles from '../styles.module.scss';
import Configure from '../../../../components/admin/configure';
import BackgroundsAuthGet from '../../../../components/admin/crud/backgrounds-auth/get';
import BackgroundsAuthCreate from '../../../../components/admin/crud/backgrounds-auth/create';
import BackgroundsAuthUpdate from '../../../../components/admin/crud/backgrounds-auth/update';
import BackgroundsAuthDelete from '../../../../components/admin/crud/backgrounds-auth/delete';

const DashboardBackgroundsAuth = () => {
  const options = ['Buscar', 'Criar', 'Atualizar', 'Deletar'];

  const components = {
    Buscar: BackgroundsAuthGet,
    Criar: BackgroundsAuthCreate,
    Atualizar: BackgroundsAuthUpdate,
    Deletar: BackgroundsAuthDelete,
  };

  return (
    <main>
      <div className={styles.container}>
        <Configure options={options} components={components} />
      </div>
    </main>
  );
};

export default DashboardBackgroundsAuth;
