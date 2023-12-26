import api from '../database/boot';

const animes_services = {
  findAll: async () => {
    try {
      const res = await api.get('/animes');
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao buscar todos animes.');
    }
  },
};
export default animes_services;
