import { storeToken } from '../../redux/action-types/auth.action';
import api from '../database/boot';
import jwt from 'jsonwebtoken';

interface Login {
  email: string;
  password: string;
}

export interface UserInfo {
  id: number;
  firstName: string;
  userName: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

const auth_service = {
  login: async (attributes: Login, dispatch: any) => {
    try {
      const res = await api.post('/login', attributes);

      if (res.status === 200 || res.status === 201) {
        const token = res.data.access_token;
        const decodedToken = jwt.decode(token) as UserInfo;

        if (decodedToken) {
          sessionStorage.setItem('nekoanimes-token', token);
          dispatch(storeToken(token, decodedToken));
        }

        return { success: true, data: decodedToken };
      } else {
        return { success: false, error: 'Acesso não autorizado' };
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
  loginAdmin: async (attributes: Login, dispatch: any) => {
    try {
      const res = await api.post('/login', attributes);

      if (res.status === 200 || res.status === 201) {
        const token = res.data.access_token;
        const decodedToken = jwt.decode(token) as UserInfo;

        if (decodedToken && decodedToken.role === 'admin') {
          sessionStorage.setItem('nekoanimes-admin-token', token);
          dispatch(storeToken(token, decodedToken));
        }

        return { success: true, data: decodedToken };
      } else {
        return { success: false, error: 'Acesso não autorizado' };
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
