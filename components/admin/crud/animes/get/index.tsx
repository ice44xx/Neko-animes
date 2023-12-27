import styles from '../../styles.module.scss';
import animes_services, { Animes } from '../../../../../services/animes/animes.service';
import React, { useEffect, useState } from 'react';
import { Categories } from '../../../../../services/categories/categories.service';
import Image from 'next/image';
import { Table } from 'reactstrap';

const AnimesGet = () => {
  const [data, setData] = useState<Animes[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await animes_services.get();
        const modifiedData = res.map((item: any) => ({
          ...item,
          categoryNames: item.categories.map((category: Categories) => category.name).join(', '),
          classificationName: item.classifications.name,
        }));
        setData(modifiedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container_table}>
      <h2>Animes</h2>
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Anime</th>
            <th>Synopsis</th>
            <th>Thumbnail</th>
            <th>Destaque</th>
            <th>Categorias</th>
            <th>Classificação</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                {item.synopsis.length > 10 ? `${item.synopsis.substring(0, 50)}...` : item.synopsis}
              </td>
              <td>
                <Image src={item.thumbnailUrl} alt={item.name} width={40} height={50} />
              </td>
              <td>{item.feature ? 'Sim' : 'Não'}</td>
              <td>{item.categoryNames}</td>
              <td>{item.classificationName}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AnimesGet;
