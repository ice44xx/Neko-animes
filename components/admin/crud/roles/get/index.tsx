import styles from '../../styles.module.scss';
import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import roles_service, { Roles } from '../../../../../services/roles/roles.service';

const RolesGet = () => {
  const [data, setData] = useState<Roles[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await roles_service.getAdmin();
        setData(res);
      } catch (error) {
        console.error('Erro ao buscar as roles:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container_table}>
      <h2>Roles</h2>
      <Table responsive hover>
        <thead>
          <tr>
            <th>Role ID</th>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={7}>Nenhuma role encontrada</td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default RolesGet;
