import api from '../database/boot';

export interface UsersLogin {
  email: string;
  password: string;
}

export interface UsersCreate {
  userName: string;
  email: string;
  birthday: string;
  password: string;
}

export interface UsersGet {
  id: number;
  userName: string;
  email: string;
  birthday: Date;
  password: string;
  profile: string;
  role: string;
  createdAt: Date;
}

export interface User {
  id?: number;
  userName?: string;
  email?: string;
  birthday?: string;
  password?: string;
  profile?: string;
}

export interface UserProfile {
  profile?: string;
}

export interface UserPassword {
  password: string;
  newPassword: string;
}

export interface UserUpdate {
  userName?: string;
  email?: string;
  birthday?: string;
}

export interface AdminsCreate {
  id?: number | string;
  userName: string;
  email: string;
  birthday: string;
  password: string;
  roleId: number;
}

export interface AdminsUpdate {
  id?: number | string;
  userName?: string;
  email?: string;
  profile?: string;
  birthday?: string;
  roleId: number;
}

const users_service = {
  getAdmin: async () => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        const res = await api.get('/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao buscar os usuários.');
    }
  },
  getByNameAdmin: async (name: string) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        const res = await api.get(`/users/username/${name}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || `Erro ao buscar o usuário ${name}`);
    }
  },
  getByIdAdmin: async (id: number) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        const res = await api.get(`/users/id/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || `Erro ao buscar o usuário ${id}`);
    }
  },
  createAdmin: async (attributes: AdminsCreate) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        const res = await api.post('/users/create/admin', attributes, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao criar o usuário.');
    }
  },
  updateAdmin: async (id: number, attributes: Partial<AdminsUpdate>) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        const res = await api.put(`/users/${id}`, attributes, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao atualizar o usuário.');
    }
  },
  deleteAdmin: async (id: number) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        const res = await api.delete(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao deletar o usuário.');
    }
  },
  getUser: async () => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        const res = await api.get('/users/data', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao buscar o usuário.');
    }
  },
  update: async (attributes: UserUpdate) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        const res = await api.put(`/users`, attributes, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao atualizar o usuário.');
    }
  },
  updatePassword: async (attributes: UserPassword) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        const res = await api.put(`/users/password`, attributes, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao atualizar a senha.');
    }
  },
  updateProfile: async (attributes: UserProfile) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        const res = await api.put(`/users/profile`, attributes, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao atualizar o usuário.');
    }
  },
};

export default users_service;
