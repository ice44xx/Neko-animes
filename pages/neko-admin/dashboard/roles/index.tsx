import Head from 'next/head';
import Configure from '../../../../components/admin/configure';
import RolesCreate from '../../../../components/admin/crud/roles/create';
import RolesDelete from '../../../../components/admin/crud/roles/delete';
import RolesGet from '../../../../components/admin/crud/roles/get';
import styles from '../styles.module.scss';

const DashboardRoles = () => {
  const options = ['Buscar', 'Criar', 'Deletar'];

  const components = {
    Buscar: RolesGet,
    Criar: RolesCreate,
    Deletar: RolesDelete,
  };

  return (
    <>
      <Head>
        <title>Neko Admin - Roles</title>
      </Head>
      <main>
        <div className={styles.container}>
          <Configure options={options} components={components} />
        </div>
      </main>
    </>
  );
};

export default DashboardRoles;
