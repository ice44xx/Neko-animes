import styles from '../../styles.module.scss';
import Image from 'next/image';
import animes_services, { Animes } from '../../../../../services/animes/animes.service';
import React, { useEffect, useState } from 'react';
import { Categories } from '../../../../../services/categories/categories.service';
import { Table } from 'reactstrap';
import ButtonComponent from '../../../../common/button';
import SearchAdmin from '../../../search';

const AnimesGet = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<Animes[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res;

        if (!search) {
          res = await animes_services.get();
        } else if (!isNaN(Number(search))) {
          const singleItem = await animes_services.getById(Number(search));
          res = Array.isArray(singleItem) ? singleItem : [singleItem];
        } else {
          res = await animes_services.getByName(search);
        }

        if (res) {
          const modifiedData = res.map((item: any) => ({
            ...item,
            categoryNames: item.categories.map((category: Categories) => category.name).join(', '),
            types: item.types.name,
            classificationName: item.classifications.name,
          }));
          setData(modifiedData);
        }
      } catch (error) {
        console.error(error);
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
      <h2>Animes</h2>
      <SearchAdmin
        placeholder="Buscar pelo nome do anime..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Anime</th>
            <th>Synopsis</th>
            <th>Thumbnail</th>
            <th>Destaque</th>
            <th>Tipo</th>
            <th>Categorias</th>
            <th>Classificação</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 ? (
            <tr>
              <td colSpan={7}>Nenhum anime encontrado</td>
            </tr>
          ) : (
            currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  {item.synopsis.length > 10
                    ? `${item.synopsis.substring(0, 50)}...`
                    : item.synopsis}
                </td>
                <td>
                  <Image src={item.thumbnailUrl} alt={item.name} width={40} height={50} />
                </td>
                <td>{item.feature ? 'Sim' : 'Não'}</td>
                <td>{item.types}</td>
                <td>{item.categoryNames}</td>
                <td>{item.classificationName}</td>
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

export default AnimesGet;
