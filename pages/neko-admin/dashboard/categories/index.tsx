import styles from '../styles.module.scss';
import CategoriesCreate from '../../../../components/admin/crud/categories/create';
import Configure from '../../../../components/admin/configure';
import CategoriesGet from '../../../../components/admin/crud/categories/get';
import CategoriessUpdate from '../../../../components/admin/crud/categories/update';
import CategoriesDelete from '../../../../components/admin/crud/categories/delete';

const DashboardCategories = () => {
  const options = ['Buscar', 'Criar', 'Atualizar', 'Deletar'];

  const components = {
    Buscar: CategoriesGet,
    Criar: CategoriesCreate,
    Atualizar: CategoriessUpdate,
    Deletar: CategoriesDelete,
  };

  return (
    <main>
      <div className={styles.container}>
        <Configure options={options} components={components} />
      </div>
    </main>
  );
};

export default DashboardCategories;
