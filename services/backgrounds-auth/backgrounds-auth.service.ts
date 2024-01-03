import api from '../database/boot';

export interface BackgroundsAuth {
  id?: number | string;
  url: string;
  order: number;
}

const backgrounds_auth_service = {
  get: async () => {
    try {
      const res = await api.get('/backgrounds-auth');
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao buscar os backgrounds.');
    }
  },
  create: async (attributes: BackgroundsAuth) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        const res = await api.post('/backgrounds-auth/create', attributes, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao criar o background.');
    }
  },
  update: async (id: number, attributes: Partial<BackgroundsAuth>) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        const res = await api.put(`/backgrounds-auth/${id}`, attributes, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao atualizar o background.');
    }
  },
  delete: async (id: number) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        const res = await api.delete(`/backgrounds-auth/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao deletar o background.');
    }
  },
};

export default backgrounds_auth_service;
