import styles from '../../styles.module.scss';
import React, { useEffect, useState } from 'react';
import seasons_service, { Seasons } from '../../../../../services/seasons/seasons.service';
import { Form, Table } from 'reactstrap';
import Image from 'next/image';
import InputComponent from '../../../../common/input';
import ButtonComponent from '../../../../common/button';

const SeasonsGet = () => {
  const [data, setData] = useState<Seasons[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await seasons_service.get(search);
        if (res) {
          setData(Array.isArray(res) ? res : [res]);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error('Erro ao buscar as temporadas:', error);
      }
    };

    fetchData();
  }, [search]);

  return (
    <div className={styles.container_table}>
      <h2>Temporadas</h2>
      <div className={styles.container_search}>
        <Form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <InputComponent
            placeholder="Buscar por nome..."
            onChange={(e) => setSearch(e.target.value)}
            className={styles.input}
          />
        </Form>
      </div>
      <Table hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Anime</th>
            <th>Anime ID</th>
            <th>Temporada</th>
          </tr>
        </thead>
        <tbody>
          {data.map((season: Seasons) => (
            <tr key={season.id}>
              <td>{season.id}</td>
              <td>{season.anime?.name}</td>
              <td>{season.anime?.id}</td>
              <td>{season.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SeasonsGet;
