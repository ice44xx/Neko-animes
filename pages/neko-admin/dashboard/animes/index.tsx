import styles from '../styles.module.scss';
import AnimesCreate from '../../../../components/admin/crud/animes/create';
import Configure from '../../../../components/admin/configure';
import AnimesGet from '../../../../components/admin/crud/animes/get';
import AnimesUpdate from '../../../../components/admin/crud/animes/update';
import AnimesDelete from '../../../../components/admin/crud/animes/delete';
import Head from 'next/head';

const DashboardAnimes = () => {
  const options = ['Buscar', 'Criar', 'Atualizar', 'Deletar'];

  const components = {
    Buscar: AnimesGet,
    Criar: AnimesCreate,
    Atualizar: AnimesUpdate,
    Deletar: AnimesDelete,
  };

  return (
    <>
      <Head>
        <title>Neko Admin - Animes</title>
      </Head>
      <main>
        <div className={styles.container}>
          <Configure options={options} components={components} />
        </div>
      </main>
    </>
  );
};

export default DashboardAnimes;
