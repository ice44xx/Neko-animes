import styles from '../../styles.module.scss';
import { Form, Table } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import seasons_service, { Seasons } from '../../../../../services/seasons/seasons.service';
import InputComponent from '../../../../common/input';
import Image from 'next/image';
import SearchAdmin from '../../../search';

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
      <SearchAdmin onChange={(e) => setSearch(e.target.value)} placeholder="Buscar pelo nome..." />
      <Table hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Anime</th>
            <th>Anime ID</th>
            <th>Thumbnail</th>
            <th>Temporada</th>
          </tr>
        </thead>
        <tbody>
          {data.map((season: Seasons) => (
            <tr key={season.id}>
              <td>{season.id}</td>
              <td>{season.anime?.name}</td>
              <td>{season.anime?.id}</td>
              <td>
                <Image
                  src={season.anime?.thumbnailUrl}
                  alt={season.anime.name}
                  width={40}
                  height={50}
                />
              </td>
              <td>{season.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SeasonsGet;
