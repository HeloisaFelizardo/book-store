import api from './api.jsx';

export const fetchLivros = async () => {
  try {
    const res = await api.get('/books');
    return res.data;
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    throw error;
  }
};

export const addBook = async (newBook) => {
  try {
    const res = await api.post('/books', newBook, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return res.data;
  } catch (error) {
    console.error('Erro ao adicionar livro:', error.response?.data || error.message);
    throw error;
  }
};


export const updateBook = async (id, updatedBook) => {
  try {
    const res = await api.put(`/books/${id}`, updatedBook);
    return res.data;
  } catch (error) {
    console.error('Erro ao atualizar o livro:', error);
    throw error;
  }
};

export const deleteBook = async (id) => {
  try {
    await api.delete(`/books/${id}`);
  } catch (error) {
    console.error('Erro ao deletar o livro:', error);
    throw error;
  }
};
