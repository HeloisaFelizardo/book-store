import { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import TableHead from "../../components/admin/TableHead.jsx";
import TableFoot from "../../components/admin/TableFoot.jsx";
import TableBody from "../../components/admin/TableBody.jsx";
import { fetchLivros, addBook, updateBook, deleteBook } from "../../services/bookService.jsx";

function AdminDashboard() {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const livrosData = await fetchLivros();
        setLivros(livrosData);
      } catch (error) {
        console.error('Erro ao carregar livros:', error);
      }
    };

    loadBooks();
  }, []);

  const handleSort = (column, direction) => {
    const sortedBooks = [...livros].sort((a, b) => {
      if (typeof a[column] === 'string') {
        return direction === 'asc'
          ? a[column].localeCompare(b[column])
          : b[column].localeCompare(a[column]);
      }
      return direction === 'asc'
        ? a[column] - b[column]
        : b[column] - a[column];
    });
    setLivros(sortedBooks);
  };

  const handleAddBook = async (newBook) => {
    try {
      const addedBook = await addBook(newBook);
      setLivros([...livros, addedBook]);
    } catch (error) {
      console.error('Erro ao adicionar livro:', error);
    }
  };

  const handleUpdateBook = async (id, updatedBook) => {
    try {
      const updated = await updateBook(id, updatedBook);
      setLivros(livros.map(livro => (livro.id === id ? updated : livro)));
    } catch (error) {
      console.error('Erro ao atualizar livro:', error);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      setLivros(livros.filter(livro => livro.id !== id));
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
    }
  };

  return (
    <Container>
      <Table striped bordered hover responsive="lg">
        <TableHead onSort={handleSort} />
        <TableBody
          livros={livros}
          deleteBook={handleDeleteBook}
          updateBook={handleUpdateBook}
        />
        <TableFoot qtdLivros={livros.length} addBook={handleAddBook}/>
      </Table>
    </Container>
  );
}

export default AdminDashboard;
