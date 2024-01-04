import styles from '../../styles.module.scss';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import backgrounds_auth_service, {
  BackgroundsAuth,
} from '../../../../../services/backgrounds-auth/backgrounds-auth.service';

const BackgroundsAuthGet = () => {
  const [data, setData] = useState<BackgroundsAuth[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await backgrounds_auth_service.get();
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
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Background URL</th>
            <th>Orderm</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={7}>Nenhum background encontrado</td>
            </tr>
          ) : (
            data.map((item) => (
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
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default BackgroundsAuthGet;
