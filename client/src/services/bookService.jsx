import api from './api.jsx';

export const fetchLivros = async () => {
  const res = await api.get('/books');
  return res.data;
};

export const addBook = async (newBook) => {
  const res = await api.post('/books', newBook);
  return res.data;
};

export const updateBook = async (id, updatedBook) => {
  const res = await api.put(`/books/${id}`, updatedBook);
  return res.data;
};

export const deleteBook = async (id) => {
  await api.delete(`/books/${id}`);
};