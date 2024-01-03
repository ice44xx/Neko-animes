import styles from '../../styles.module.scss';
import ButtonComponent from '../../../../common/button';
import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import categories_service, {
  Categories,
} from '../../../../../services/categories/categories.service';

const CategoriesGet = () => {
  const [data, setData] = useState<Categories[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await categories_service.get();
        setData(res);
      } catch (error) {
        console.error('Error ao buscar as categorias:', error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = Math.ceil(data.length / itemsPerPage);

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, pageNumbers));
  };

  return (
    <div className={styles.container_table}>
      <h2>Categorias</h2>
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Categoria</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 ? (
            <tr>
              <td colSpan={7}>Nenhuma categoria encontrada</td>
            </tr>
          ) : (
            currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <div className={styles.pagination}>
        <ButtonComponent
          onClick={handlePrevClick}
          value={'Página Anterior'}
          disabled={currentPage === 1}
          className={styles.btn}
        />
        <ButtonComponent
          onClick={handleNextClick}
          value={'Próxima Página'}
          disabled={currentPage === pageNumbers}
          className={styles.btn}
        />
      </div>
    </div>
  );
};

export default CategoriesGet;
