import styles from '../../styles.module.scss';
import SearchAdmin from '../../../search';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import users_service, { UsersGet } from '../../../../../services/users/users.service';
import { Table } from 'reactstrap';
import ButtonComponent from '../../../../common/button';

const UsersGet = () => {
  const [data, setData] = useState<UsersGet[]>([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res;
        if (!search) {
          res = await users_service.getAdmin();
        } else if (!isNaN(Number(search))) {
          res = await users_service.getByIdAdmin(Number(search));
        } else {
          res = await users_service.getByNameAdmin(search);
        }

        if (res) {
          setData(Array.isArray(res) ? res : [res]);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error('Erro ao buscar os usuários:', error);
      }
    };

    fetchData();
  }, [search]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

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
      <h2>Usuários</h2>
      <SearchAdmin placeholder="Buscar..." onChange={(e) => setSearch(e.target.value)} />
      <Table responsive hover>
        <thead>
          <tr>
            <th>Usuário ID</th>
            <th>Nickname</th>
            <th>Email</th>
            <th>Aniversário</th>
            <th>Profile</th>
            <th>Role</th>
            <th>Criado</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 ? (
            <tr>
              <td colSpan={7}>Nenhum usuário encontrado</td>
            </tr>
          ) : (
            currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.userName}</td>
                <td>{item.email}</td>
                <td>{formatDate(item.birthday)}</td>
                <td>
                  {item.profile ? (
                    <Image src={item.profile} alt={'Foto de perfil'} width={40} height={50} />
                  ) : (
                    <p>null</p>
                  )}
                </td>
                <td>{item.role}</td>
                <td>{formatDate(item.createdAt)}</td>
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

export default UsersGet;
