import Head from 'next/head';
import Configure from '../../../../components/admin/configure';
import SeasonsCreate from '../../../../components/admin/crud/seasons/create';
import SeasonsDelete from '../../../../components/admin/crud/seasons/delete';
import SeasonsGet from '../../../../components/admin/crud/seasons/get';
import SeasonsUpdate from '../../../../components/admin/crud/seasons/update';
import styles from '../styles.module.scss';

const DashboardSeasons = () => {
  const options = ['Buscar', 'Criar', 'Atualizar', 'Deletar'];

  const components = {
    Buscar: SeasonsGet,
    Criar: SeasonsCreate,
    Atualizar: SeasonsUpdate,
    Deletar: SeasonsDelete,
  };

  return (
    <>
      <Head>
        <title>Neko Admin - Temporadas</title>
      </Head>
      <main>
        <div className={styles.container}>
          <Configure options={options} components={components} />
        </div>
      </main>
    </>
  );
};

export default DashboardSeasons;
