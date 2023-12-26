import styles from '../../styles.module.scss';
import React, { useEffect, useState } from 'react';
import classifications_service, {
  Classifications,
} from '../../../../../services/classifications/classifications.service';

const ClassificationsGet = () => {
  const [data, setData] = useState<Classifications[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await classifications_service.get();
        setData(res);
      } catch (error) {
        console.error('Error ao buscar as classificações, ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container_table}>
      <h2>Classificações</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Classificação</th>
            <th>Descrição</th>
            <th>Thumbnail</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.desc}</td>
              <td>
                <img src={item.thumbnail} alt={`Thumbnail ${item.id}`} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassificationsGet;
