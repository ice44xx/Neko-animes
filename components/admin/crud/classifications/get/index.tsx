import styles from '../../styles.module.scss';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import classifications_service, {
  Classifications,
} from '../../../../../services/classifications/classifications.service';
import { Table } from 'reactstrap';

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
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Classificação</th>
            <th>Descrição</th>
            <th>Thumbnail</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={7}>Nenhuma classificação encontrada</td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.desc}</td>
                <td>
                  <Image src={item.thumbnail} alt={item.name} width={100} height={120} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ClassificationsGet;
