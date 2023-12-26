import api from '../database/boot';

export interface Seasons {
  id?: number | string;
  name: string;
  animeId: number;
  order?: number;
  anime?: {
    id: number;
    name: string;
  };
}

const seasons_service = {
  get: async (name: string) => {
    try {
      const res = await api.get(`/seasons/${name}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao buscar as temporadas.');
    }
  },
  create: async (attributes: Seasons) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      const res = await api.post('/seasons/create', attributes, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao criar a temporada.');
    }
  },
  update: async (id: number, attributes: Partial<Seasons>) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      const res = await api.put(`/seasons/${id}`, attributes, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao atualizar a temporada.');
    }
  },
  delete: async (id: number) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      const res = await api.delete(`/seasons/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao deletar a temporada.');
    }
  },
};

export default seasons_service;
