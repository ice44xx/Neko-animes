import api from '../database/boot';

export interface Likes {
  id?: number;
  animeId: number;
  anime: string;
  thumbnailUrl: string;
  like: boolean;
}

const likes_services = {
  get: async () => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        const res = await api.get('/likes-animes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao buscar os likes.');
    }
  },
  create: async (id: number) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        const res = await api.post(
          `/likes-animes/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        return res.data;
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao criar o like.');
    }
  },
  delete: async (id: number) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        const res = await api.delete(`/likes-animes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao remover o like.');
    }
  },
};
export default likes_services;
