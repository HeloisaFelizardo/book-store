import { Button, Modal, Form } from "react-bootstrap";
import { PlusLg } from "react-bootstrap-icons";
import { useState, useRef } from "react";

export default function TableFoot({ qtdLivros, addBook }) {
  const [show, setShow] = useState(false);
  const [bookTitle, setBookTitle] = useState('');
  const [bookAutor, setBookAutor] = useState('');
  const [bookEditora, setBookEditora] = useState('');
  const [bookPrice, setBookPrice] = useState('');
  const [tempImage, setTempImage] = useState(''); // State to store image temporarily
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleClose = () => {
    setShow(false);
    setTempImage(''); // Clear temporary image on close
    setValidated(false);
    setErrorMessage('');
  };

  const handleShow = () => setShow(true);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        await addBook({
          titulo: bookTitle,
          autor: bookAutor,
          editora: bookEditora,
          preco: parseFloat(bookPrice),
          imagem: tempImage // Use temporary image
        });

        // Clear form fields
        setBookTitle('');
        setBookAutor('');
        setBookEditora('');
        setBookPrice('');
        setTempImage('');
        handleClose();
      } catch (error) {
        console.error('Erro ao adicionar livro:', error);
        setErrorMessage('Erro ao adicionar livro. Tente novamente.');
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
      <tfoot>
      <tr>
        <td colSpan='5'>Quantidade de livros na tabela: {qtdLivros}</td>
        <td><Button variant='success' size='sm' onClick={handleShow}>Add <PlusLg /></Button></td>
      </tr>
      </tfoot>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Livro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
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
