import styles from '../styles.module.scss';
import Configure from '../../../../components/admin/configure';
import UsersCreate from '../../../../components/admin/crud/users/create';
import UsersGet from '../../../../components/admin/crud/users/get';
import UsersDelete from '../../../../components/admin/crud/users/delete';
import UsersUpdate from '../../../../components/admin/crud/users/update';

const DashboardUsers = () => {
  const options = ['Buscar', 'Criar', 'Atualizar', 'Deletar'];

  const components = {
    Buscar: UsersGet,
    Criar: UsersCreate,
    Atualizar: UsersUpdate,
    Deletar: UsersDelete,
  };

  return (
    <main>
      <div className={styles.container}>
        <Configure options={options} components={components} />
      </div>
    </main>
  );
};

export default DashboardUsers;
