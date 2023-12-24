import api from '../database/boot';

const animes_services = {
  findAll: async () => {
    try {
      const res = await api.get('/animes');
      return res.data;
    } catch (error: any) {
      if (error.response) {
        console.error('Erro de status:', error.response.status);
        console.error('Detalhes do erro:', error.response.data);
        throw new Error('Erro no servidor');
      } else if (error.request) {
        console.error('Erro ao aguardar resposta do servidor');
        throw new Error('Erro de requisição');
      } else {
        console.error('Erro ao configurar a requisição:', error.message);
        throw new Error('Erro de configuração da requisição');
      }
    }
  },
};
export default animes_services;
