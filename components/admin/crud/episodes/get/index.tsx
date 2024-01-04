import styles from '../../styles.module.scss';
import SearchAdmin from '../../../search';
import React, { useEffect, useState } from 'react';
import episodes_service, { EpisodesGet } from '../../../../../services/episodes/episodes.service';
import { Table } from 'reactstrap';
import ButtonComponent from '../../../../common/button';

const EpisodesGet = () => {
  const [data, setData] = useState<EpisodesGet[]>([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res;
        if (!search) {
          res = await episodes_service.get();
        } else if (!isNaN(Number(search))) {
          res = await episodes_service.getById(Number(search));
        } else {
          res = await episodes_service.getByName(search);
        }

        if (res) {
          setData(Array.isArray(res) ? res : [res]);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error('Erro ao buscar os episódios:', error);
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
      <h2>Episódios</h2>
      <SearchAdmin
        placeholder="Buscar pelo nome do anime..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <Table responsive hover>
        <thead>
          <tr>
            <th>Episódio ID</th>
            <th>Anime </th>
            <th>Nome</th>
            <th>Ordem</th>
            <th>Video URL</th>
            <th>Temporada ID</th>
            <th>Temporada </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 ? (
            <tr>
              <td colSpan={7}>Nenhum episódio encontrado</td>
            </tr>
          ) : (
            currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.seasons.anime.name}</td>
                <td>{item.name}</td>
                <td>{item.episodeOrder}</td>
                <td>{item.url}</td>
                <td>{item.seasons.id}</td>
                <td>{item.seasons.name}</td>
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

export default EpisodesGet;
