import api from '../database/boot';

export interface Animes {
  id?: number | string;
  name: string;
  synopsis: string;
  thumbnailUrl: string;
  background: string;
  feature: boolean;
  types: string;
  categoryNames: string[];
  classificationName: string;
}

export interface AnimesGet {
  id?: number | string;
  name: string;
  synopsis: string;
  thumbnailUrl: string;
  background: string;
  feature: boolean;
  types: {
    name: string;
  };
  categories: Array<{
    name: string;
  }>;
  classifications: {
    name: string;
  };
  seasons: Array<{
    id: number;
    name: string;
    episodes: Array<{
      id: number;
      name: string;
      episodeOrder: number;
      url: string;
      likes: number;
    }>;
  }>;
  likes: number;
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
  getByName: async (name: string) => {
    try {
      const res = await api.get(`/animes/${name}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || `Erro ao buscar o anime ${name}`);
    }
  },
  getTop10Newest: async () => {
    try {
      const res = await api.get('/animes/newest');
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao buscar todos animes lançamentos.');
    }
  },
  getTop10Features: async () => {
    try {
      const res = await api.get('/animes/features');
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao buscar todos animes.');
    }
  },
  getTop10Likes: async () => {
    try {
      const res = await api.get('/animes/likes');
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao buscar todos animes.');
    }
  },
  create: async (attributes: Animes) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        const res = await api.post('/animes/create', attributes, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao criar o anime.');
    }
  },
  update: async (id: number, attributes: Partial<Animes>) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        const res = await api.put(`/animes/${id}`, attributes, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao atualizar o anime.');
    }
  },
  delete: async (id: number) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        const res = await api.delete(`/animes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao deletar o anime.');
    }
  },
};
export default animes_services;
