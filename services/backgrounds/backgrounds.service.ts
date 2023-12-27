import api from '../database/boot';

export interface Backgrounds {
  id?: number | string;
  url: string;
  order: number;
}

const backgrounds_service = {
  get: async () => {
    try {
      const res = await api.get('/backgrounds');
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao buscar os backgrounds.');
    }
  },
  create: async (attributes: Backgrounds) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      const res = await api.post('/backgrounds/create', attributes, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao criar o background.');
    }
  },
  update: async (id: number, attributes: Partial<Backgrounds>) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      const res = await api.put(`/backgrounds/${id}`, attributes, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao atualizar o background.');
    }
  },
  delete: async (id: number) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      const res = await api.delete(`/backgrounds/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao deletar o background.');
    }
  },
};

export default backgrounds_service;
