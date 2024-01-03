import styles from '../../styles.module.scss';
import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import types_service, { Types } from '../../../../../services/type/types.service';

const TypesGet = () => {
  const [data, setData] = useState<Types[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await types_service.get();
        setData(res);
      } catch (error) {
        console.error('Error ao buscar os tipos, ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container_table}>
      <h2>Tipos</h2>
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
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

export default TypesGet;
