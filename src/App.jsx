import { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import TableHead from "./components/TableHead.jsx";
import TableFoot from "./components/TableFoot.jsx";
import TableBody from "./components/TableBody.jsx";

function App() {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    fetch('/api/books.json')
      .then(res => res.json())
      .then(livros => setLivros(livros))
      .catch(error => {
        console.log('Erro na requisição: ' + error);
      })
      .finally(() => {
        console.log('Sempre retorna');
      });
  }, []);

  function handleRemoveLine(id) {
    const books = livros.filter((book) => book.id !== id);
    setLivros(books);
    console.log(id + ' botão clicado');
  }

  function handleSort(column, direction) {
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
  }

  return (
    <Container>
      <Table striped bordered hover responsive="lg">
        <TableHead onSort={handleSort} />
        <TableBody livros={livros} deleteBook={handleRemoveLine} />
        <TableFoot qtdLivros={livros.length} />
      </Table>
    </Container>
  );
}

export default App;
