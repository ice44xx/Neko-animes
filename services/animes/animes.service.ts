import api from '../database/boot';

export interface Animes {
  id?: number | string;
  name: string;
  synopsis: string;
  thumbnailUrl: string;
  feature: boolean;
  categoryNames: string[];
  classificationName: string;
}

const animes_services = {
  get: async () => {
    try {
      const res = await api.get('/animes');
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao buscar todos animes.');
    }
  },
  getById: async (id: number) => {
    try {
      const res = await api.get(`/animes/id/${id}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || `Erro ao buscar o anime ${id}`);
    }
  },
  create: async (attributes: Animes) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      const res = await api.post('/animes/create', attributes, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao criar o anime.');
    }
  },
  update: async (id: number, attributes: Partial<Animes>) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      const res = await api.put(`/animes/${id}`, attributes, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao atualizar o anime.');
    }
  },
  delete: async (id: number) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      const res = await api.delete(`/animes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao deletar o anime.');
    }
  },
};
export default animes_services;
