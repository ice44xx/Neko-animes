import styles from '../styles.module.scss';
import Configure from '../../../../components/admin/configure';
import TypesGet from '../../../../components/admin/crud/types-animes/get';
import TypesCreate from '../../../../components/admin/crud/types-animes/create';
import TypesUpdate from '../../../../components/admin/crud/types-animes/update';
import TypesDelete from '../../../../components/admin/crud/types-animes/delete';
import Head from 'next/head';

const DashboardTypes = () => {
  const options = ['Buscar', 'Criar', 'Atualizar', 'Deletar'];

  const components = {
    Buscar: TypesGet,
    Criar: TypesCreate,
    Atualizar: TypesUpdate,
    Deletar: TypesDelete,
  };

  return (
    <>
      <Head>
        <title>Neko Admin - Tipos</title>
      </Head>
      <main>
        <div className={styles.container}>
          <Configure options={options} components={components} />
        </div>
      </main>
    </>
  );
};

export default DashboardTypes;
