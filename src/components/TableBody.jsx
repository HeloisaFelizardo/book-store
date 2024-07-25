import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function TableBody({ livros, deleteBook }) {
  return (
    <tbody>
    {livros.map((livro) => (
      <tr key={livro.id}>
        <td>{livro.titulo}</td>
        <td>{livro.autor}</td>
        <td>{livro.editora}</td>
        <td>{livro.preco}</td>
        <td>
          <Button size='sm' onClick={() => deleteBook(livro.id)}>
            REMOVER
          </Button>
        </td>
      </tr>
    ))}
    </tbody>
  );
}

TableBody.propTypes = {
  livros: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      titulo: PropTypes.string.isRequired,
      autor: PropTypes.string.isRequired,
      editora: PropTypes.string.isRequired,
      preco: PropTypes.number.isRequired,
    })
  ).isRequired,
  deleteBook: PropTypes.func.isRequired,
};
