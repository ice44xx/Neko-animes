import api from '../database/boot';

export interface Types {
  id?: number | string;
  name: string;
}

export interface TypesAnimes {
  id: number;
  name: string;
  synopsis: string;
  thumbnailUrl: string;
}

const types_service = {
  get: async () => {
    try {
      const res = await api.get('types-animes');
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao buscar os tipos.');
    }
  },
  getByName: async (name: string) => {
    try {
      const res = await api.get(`types-animes/${name}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || `Erro ao buscar o tipo ${name}`);
    }
  },
  getTop10Movies: async (name: string) => {
    try {
      const res = await api.get(`types-animes/${name}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || `Erro ao buscar o tipo ${name}`);
    }
  },
  create: async (attributes: Types) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        const res = await api.post('types-animes/create', attributes, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao criar o tipo.');
    }
  },
  update: async (id: number, attributes: Partial<Types>) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        const res = await api.put(`types-animes/${id}`, attributes, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao atualizar a classificação.');
    }
  },
  delete: async (id: number) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        const res = await api.delete(`types-animes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao deletar o tipo.');
    }
  },
};

export default types_service;
