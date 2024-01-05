import styles from '../styles.module.scss';
import Configure from '../../../../components/admin/configure';
import ClassificationsCreate from '../../../../components/admin/crud/classifications/create';
import ClassificationsGet from '../../../../components/admin/crud/classifications/get';
import ClassificationsDelete from '../../../../components/admin/crud/classifications/delete';
import ClassificationsUpdate from '../../../../components/admin/crud/classifications/update';
import Head from 'next/head';

const DashboardClassifications = () => {
  const options = ['Buscar', 'Criar', 'Atualizar', 'Deletar'];

  const components = {
    Buscar: ClassificationsGet,
    Criar: ClassificationsCreate,
    Atualizar: ClassificationsUpdate,
    Deletar: ClassificationsDelete,
  };

  return (
    <>
      <Head>
        <title>Neko Admin - Classificações</title>
      </Head>
      <main>
        <div className={styles.container}>
          <Configure options={options} components={components} />
        </div>
      </main>
    </>
  );
};

export default DashboardClassifications;
