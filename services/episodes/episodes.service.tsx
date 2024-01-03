import api from '../database/boot';

export interface EpisodesCreate {
  id?: number | string;
  name: string;
  url: string;
  episodeOrder: number;
  seasonId: number;
}

export interface EpisodesGet {
  id?: number | string;
  name: string;
  url: string;
  episodeOrder: number;
  likes: number;
  seasons: {
    id: number;
    name: string;
    anime: {
      id: number;
      name: string;
    };
  };
}

const episodes_service = {
  get: async () => {
    try {
      const res = await api.get('/episodes');
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao buscar os episódios.');
    }
  },
  getByName: async (name: string) => {
    try {
      const res = await api.get(`/episodes/name/${name}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || `Erro ao buscar episódio ${name}`);
    }
  },
  getById: async (id: number) => {
    try {
      const res = await api.get(`/episodes/id/${id}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || `Erro ao buscar episódio ${id}`);
    }
  },
  create: async (attributes: EpisodesCreate) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        const res = await api.post('/episodes/create', attributes, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao criar o episódio.');
    }
  },
  update: async (id: number, attributes: Partial<EpisodesCreate>) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        const res = await api.put(`/episodes/${id}`, attributes, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao atualizar o episódio.');
    }
  },
  delete: async (id: number) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        const res = await api.delete(`/episodes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao deletar o episódio.');
    }
  },
};

export default episodes_service;
