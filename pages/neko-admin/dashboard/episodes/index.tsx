import styles from '../styles.module.scss';
import Configure from '../../../../components/admin/configure';
import EpisodesCreate from '../../../../components/admin/crud/episodes/create';
import EpisodesGet from '../../../../components/admin/crud/episodes/get';
import EpisodesUpdate from '../../../../components/admin/crud/episodes/update';
import EpisodesDelete from '../../../../components/admin/crud/episodes/delete';

const DashboardEpisodes = () => {
  const options = ['Buscar', 'Criar', 'Atualizar', 'Deletar'];

  const components = {
    Buscar: EpisodesGet,
    Criar: EpisodesCreate,
    Atualizar: EpisodesUpdate,
    Deletar: EpisodesDelete,
  };

  return (
    <main>
      <div className={styles.container}>
        <Configure options={options} components={components} />
      </div>
    </main>
  );
};

export default DashboardEpisodes;
