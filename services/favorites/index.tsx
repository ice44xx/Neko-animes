import api from '../database/boot';

export interface Favorites {
  id?: number;
  animeId: number;
  anime: string;
  thumbnailUrl: string;
  favorite: boolean;
}

const favorites_services = {
  get: async () => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        const res = await api.get('/favorites', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao buscar os favoritos.');
    }
  },
  create: async (id: number) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        const res = await api.post(
          `/favorites/${id}`,
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
      throw new Error(error.response.data.message || 'Erro ao criar favorito.');
    }
  },
  delete: async (id: number) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        const res = await api.delete(`/favorites/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao deletar favorito.');
    }
  },
};
export default favorites_services;
