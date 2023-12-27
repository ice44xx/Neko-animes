import api from '../database/boot';

export interface Classifications {
  id?: number | string;
  name: string;
  thumbnail: string;
  desc: string;
}

const classifications_service = {
  get: async () => {
    try {
      const res = await api.get('/classifications');
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao buscar as classificações.');
    }
  },
  create: async (attributes: Classifications) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      const res = await api.post('/classifications/create', attributes, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao criar a classificação.');
    }
  },
  update: async (id: number, attributes: Partial<Classifications>) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      const res = await api.put(`/classifications/${id}`, attributes, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao atualizar a classificação.');
    }
  },
  delete: async (id: number) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      const res = await api.delete(`/classifications/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao deletar a classificação.');
    }
  },
};

export default classifications_service;
