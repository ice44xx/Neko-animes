import styles from '../../styles.module.scss';
import animes_services, { Animes } from '../../../../../services/animes/animes.service';
import React, { useEffect, useState } from 'react';
import { Categories } from '../../../../../services/categories/categories.service';

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
      <table>
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
              <td>{item.synopsis}</td>
              <td>{item.thumbnailUrl}</td>
              <td>{item.feature ? 'Sim' : 'Não'}</td>
              <td>{item.categoryNames}</td>
              <td>{item.classificationName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnimesGet;
