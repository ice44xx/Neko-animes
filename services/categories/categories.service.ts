import api from '../database/boot';

export interface Categories {
  id?: number | string;
  name: string;
}

const categories_service = {
  get: async () => {
    try {
      const res = await api.get('/categories');
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao buscar as categorias.');
    }
  },
  create: async (attributes: Categories) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      const res = await api.post('/categories/create', attributes, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao criar a categoria.');
    }
  },
  update: async (id: number, attributes: Partial<Categories>) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      const res = await api.put(`/categories/${id}`, attributes, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao atualizar a categoria.');
    }
  },
  delete: async (id: number) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      const res = await api.delete(`/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao deletar a categoria.');
    }
  },
};

export default categories_service;
