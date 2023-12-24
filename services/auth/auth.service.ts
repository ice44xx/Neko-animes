import api from '../database/boot';

interface Login {
  email: string;
  password: string;
}

const auth_service = {
  login: async (attributes: Login) => {
    try {
      const res = await api.post('/login', attributes);

      if (res.status === 200 || res.status === 201) {
        sessionStorage.setItem('nekoanimes-token', res.data.access_token);
        return { success: true, data: res.data };
      } else {
        return { success: false, error: 'Credenciais inválidas' };
      }
    } catch (error: any) {
      if (error.response) {
        return { success: false, error: error.response.data.message };
      } else if (error.request) {
        return { success: false, error: 'Erro na requisição' };
      } else {
        return { success: false, error: 'Erro desconhecido' };
      }
    }
  },
};
export default auth_service;
