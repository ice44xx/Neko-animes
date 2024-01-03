import styles from '../../styles.module.scss';
import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import categories_service, {
  Categories,
} from '../../../../../services/categories/categories.service';

const CategoriesGet = () => {
  const [data, setData] = useState<Categories[]>([]);

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
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CategoriesGet;
