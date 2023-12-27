import styles from '../../styles.module.scss';
import React, { useEffect, useState } from 'react';
import users_service, { UsersGet } from '../../../../../services/users/users.service';
import { Table } from 'reactstrap';
import SearchAdmin from '../../../search';
import Image from 'next/image';

const UsersGet = () => {
  const [data, setData] = useState<UsersGet[]>([]);
  const [search, setSearch] = useState('');

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

  return (
    <div className={styles.container_table}>
      <h2>Usuários</h2>
      <SearchAdmin placeholder="Buscar..." onChange={(e) => setSearch(e.target.value)} />
      <Table hover>
        <thead>
          <tr>
            <th>Usuário ID</th>
            <th>Nome Real</th>
            <th>Nickname</th>
            <th>Email</th>
            <th>Aniversário</th>
            <th>Profile</th>
            <th>Role</th>
            <th>Criado</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={7}>Nenhum usuário encontrado</td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
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
    </div>
  );
};

export default UsersGet;
