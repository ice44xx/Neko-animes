import styles from '../../styles.module.scss';
import Image from 'next/image';
import SearchAdmin from '../../../search';
import { Table } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import seasons_service, { SeasonsGet } from '../../../../../services/seasons/seasons.service';
import ButtonComponent from '../../../../common/button';

const SeasonsGet = () => {
  const [data, setData] = useState<SeasonsGet[]>([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await seasons_service.getByName(search);
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = Math.ceil(data.length / itemsPerPage);

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, pageNumbers));
  };

  return (
    <div className={styles.container_table}>
      <h2>Temporadas</h2>
      <SearchAdmin onChange={(e) => setSearch(e.target.value)} placeholder="Buscar pelo nome..." />
      <Table responsive hover>
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
          {currentItems.length === 0 ? (
            <tr>
              <td colSpan={7}>Nenhuma temporada encontrada</td>
            </tr>
          ) : (
            currentItems.map((season: SeasonsGet) => (
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
            ))
          )}
        </tbody>
      </Table>
      <div className={styles.pagination}>
        <ButtonComponent
          onClick={handlePrevClick}
          value={'Página Anterior'}
          disabled={currentPage === 1}
          className={styles.btn}
        />
        <ButtonComponent
          onClick={handleNextClick}
          value={'Próxima Página'}
          disabled={currentPage === pageNumbers}
          className={styles.btn}
        />
      </div>
    </div>
  );
};

export default SeasonsGet;
