import styles from '../styles.module.scss';
import Configure from '../../../../components/admin/configure';
import TypesGet from '../../../../components/admin/crud/type/get';
import TypesCreate from '../../../../components/admin/crud/type/create';
import TypesUpdate from '../../../../components/admin/crud/type/update';
import TypesDelete from '../../../../components/admin/crud/type/delete';

const DashboardTypes = () => {
  const options = ['Buscar', 'Criar', 'Atualizar', 'Deletar'];

  const components = {
    Buscar: TypesGet,
    Criar: TypesCreate,
    Atualizar: TypesUpdate,
    Deletar: TypesDelete,
  };

  return (
    <main>
      <div className={styles.container}>
        <Configure options={options} components={components} />
      </div>
    </main>
  );
};

export default DashboardTypes;
