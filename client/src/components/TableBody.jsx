import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FloppyFill, PencilSquare, TrashFill } from "react-bootstrap-icons";
import { useState } from "react";

export default function TableBody({ livros, deleteBook, updateBook }) {
  const [editingBookId, setEditingBookId] = useState(null);
  const [bookTitle, setBookTitle] = useState('');
  const [bookAutor, setBookAutor] = useState('');
  const [bookEditora, setBookEditora] = useState('');
  const [bookPrice, setBookPrice] = useState('');

  function handleEditClick(livro) {
    if (editingBookId === livro.id) {
      // Save the edited book
      updateBook(livro.id, {
        titulo: bookTitle,
        autor: bookAutor,
        editora: bookEditora,
        preco: parseFloat(bookPrice),
      });
      setEditingBookId(null);
    } else {
      setEditingBookId(livro.id);
      setBookTitle(livro.titulo);
      setBookAutor(livro.autor);
      setBookEditora(livro.editora);
      setBookPrice(livro.preco);
    }
  }

  return (
    <tbody>
    {livros.map((livro) => (
      <tr key={livro.id}>
        {editingBookId === livro.id ? (
          <>
            <td>
              <input type='text'
                     required value={bookTitle}
                     onChange={(e) => setBookTitle(e.target.value)} />
            </td>
            <td>
              <input type='text'
                     required value={bookAutor}
                     onChange={(e) => setBookAutor(e.target.value)} />
            </td>
            <td>
              <input type='text'
                     required value={bookEditora}
                     onChange={(e) => setBookEditora(e.target.value)} />
            </td>
            <td>
              <input type='number'
                     required value={bookPrice}
                     onChange={(e) => setBookPrice(e.target.value)} />
            </td>
          </>
        ) : (
          <>
            <td>{livro.titulo}</td>
            <td>{livro.autor}</td>
            <td>{livro.editora}</td>
            <td>{livro.preco}</td>
          </>
        )}
        <td>
          <Button size='sm' onClick={() => handleEditClick(livro)}>
            {editingBookId === livro.id ? <FloppyFill /> : <PencilSquare />}
          </Button>
          <Button variant='danger' size='sm' onClick={() => deleteBook(livro.id)}>
            <TrashFill />
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
      id: PropTypes.string.isRequired,
      titulo: PropTypes.string.isRequired,
      autor: PropTypes.string.isRequired,
      editora: PropTypes.string.isRequired,
      preco: PropTypes.number.isRequired,
    })
  ).isRequired,
  deleteBook: PropTypes.func.isRequired,
  updateBook: PropTypes.func.isRequired,
};
