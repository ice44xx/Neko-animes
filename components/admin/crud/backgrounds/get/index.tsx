import styles from '../../styles.module.scss';
import React, { useEffect, useState } from 'react';
import backgrounds_service, {
  Backgrounds,
} from '../../../../../services/backgrounds/backgrounds.service';
import { Table } from 'reactstrap';
import Image from 'next/image';

const BackgroundsGet = () => {
  const [data, setData] = useState<Backgrounds[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await backgrounds_service.get();
        setData(res);
      } catch (error) {
        console.error('Error ao buscar os backgrounds, ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container_table}>
      <h2>Backgrounds</h2>
      <Table hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Background URL</th>
            <th>Orderm</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <Image
                  src={item.url}
                  alt={'Background'}
                  width={200}
                  height={50}
                  className={styles.img}
                />
              </td>
              <td>{item.order}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BackgroundsGet;
