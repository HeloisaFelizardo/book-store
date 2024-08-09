import { Button, Form, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { PencilSquare, TrashFill } from "react-bootstrap-icons";
import { useState, useRef } from "react";

export default function TableBody({ livros, deleteBook, updateBook }) {
  const [show, setShow] = useState(false);
  const [editingBookId, setEditingBookId] = useState(null);
  const [bookTitle, setBookTitle] = useState('');
  const [bookAutor, setBookAutor] = useState('');
  const [bookEditora, setBookEditora] = useState('');
  const [bookPrice, setBookPrice] = useState('');
  const [bookImage, setBookImage] = useState('');
  const [tempImage, setTempImage] = useState(''); // State to store image temporarily
  const [validated, setValidated] = useState(false);
  const fileInputRef = useRef(null);

  const handleClose = () => {
    setShow(false);
    setEditingBookId(null); // Clear editing state
    setTempImage(''); // Clear temporary image on close
  };

  const handleShow = (livro) => {
    setBookTitle(livro.titulo);
    setBookAutor(livro.autor);
    setBookEditora(livro.editora);
    setBookPrice(livro.preco);
    setBookImage(livro.imagem);
    setTempImage(livro.imagem); // Set temporary image for editing
    setEditingBookId(livro.id);
    setShow(true);
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        await updateBook(editingBookId, {
          titulo: bookTitle,
          autor: bookAutor,
          editora: bookEditora,
          preco: parseFloat(bookPrice),
          imagem: tempImage // Update with the temporary image
        });
        handleClose();
      } catch (error) {
        console.error('Erro ao atualizar o livro:', error);
      }
    }
    setValidated(true);
  };


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setTempImage(imageData); // Store image temporarily
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <tbody>
      {livros.map((livro) => (
        <tr key={livro.id}>
          <td>{livro.titulo}</td>
          <td>{livro.autor}</td>
          <td>{livro.editora}</td>
          <td>{livro.preco}</td>
          <td>
            {livro.imagem && <img src={livro.imagem} alt={livro.titulo} style={{ width: '100px' }} />}
          </td>
          <td>
            <Button size='sm' onClick={() => handleShow(livro)}>
              <PencilSquare />
            </Button>
            <Button variant='danger' size='sm' onClick={() => deleteBook(livro.id)}>
              <TrashFill />
            </Button>
          </td>
        </tr>
      ))}
      </tbody>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingBookId ? 'Editar Livro' : 'Adicionar Livro'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                placeholder="Título"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, insira o título do livro.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Autor</Form.Label>
              <Form.Control
                type="text"
                placeholder="Autor"
                value={bookAutor}
                onChange={(e) => setBookAutor(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, insira o autor do livro.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Editora</Form.Label>
              <Form.Control
                type="text"
                placeholder="Editora"
                value={bookEditora}
                onChange={(e) => setBookEditora(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, insira a editora do livro.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="number"
                placeholder="Preço"
                value={bookPrice}
                onChange={(e) => setBookPrice(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, insira o preço do livro.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Imagem da Capa</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, insira a imagem da capa do livro.
              </Form.Control.Feedback>
              {tempImage && <img src={tempImage} alt="Preview" style={{ width: '100px', marginTop: '10px' }} />}
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Fechar
              </Button>
              <Button variant="primary" type="submit">
                Salvar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
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
      imagem: PropTypes.string
    })
  ).isRequired,
  deleteBook: PropTypes.func.isRequired,
  updateBook: PropTypes.func.isRequired,
};
