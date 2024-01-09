import api from '../database/boot';

interface CommentsCreate {
  episodeId: number;
  text: string;
}

export interface CommentsGet {
  id: number;
  text: string;
  createdAt: Date;
  likes: number;
  users: {
    id: number;
    userName: string;
    profile: string;
  };
}

const comments_service = {
  findCommentsByEpisode: async (episodeId: number) => {
    try {
      const res = await api.get(`/comments/${episodeId}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao buscar os comentários.');
    }
  },
  create: async (attributes: CommentsCreate) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        const res = await api.post('/comments/create', attributes, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao criar o comentário.');
    }
  },
  delete: async (id: number) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      if (token) {
        const res = await api.delete(`/comments/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Erro ao deletar o comentário.');
    }
  },
};
export default comments_service;
