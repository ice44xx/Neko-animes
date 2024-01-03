import api from '../database/boot';

export interface SeasonsCreate {
  id?: number | string;
  name: string;
  animeId: number;
  order?: number;
}

export interface SeasonsGet {
  id?: number | string;
  name: string;
  animeId: number;
  order?: number;
  anime: {
    id: number;
    name: string;
    thumbnailUrl: string;
  };
}

const seasons_service = {
  get: async () => {
    try {
      const res = await api.get('/seasons');
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao buscar as temporadas.');
    }
  },
  getByName: async (name: string) => {
    try {
      const res = await api.get(`/seasons/${name}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || `Erro ao buscar a temporada ${name}.`);
    }
  },
  create: async (attributes: SeasonsCreate) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        const res = await api.post('/seasons/create', attributes, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao criar a temporada.');
    }
  },
  update: async (id: number, attributes: Partial<SeasonsCreate>) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        const res = await api.put(`/seasons/${id}`, attributes, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao atualizar a temporada.');
    }
  },
  delete: async (id: number) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        const res = await api.delete(`/seasons/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao deletar a temporada.');
    }
  },
};

export default seasons_service;
