import {Button, Modal, Form} from "react-bootstrap";
import {PlusLg} from "react-bootstrap-icons";
import {useState} from "react";

export default function TableFoot({qtdLivros, addBook}) {
  const [show, setShow] = useState(false);
  const [bookTitle, setBookTitle] = useState('');
  const [bookAutor, setBookAutor] = useState('');
  const [bookEditora, setBookEditora] = useState('');
  const [bookPrice, setBookPrice] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleAddClick() {
    // Adiciona o livro
    addBook({
      titulo: bookTitle,
      autor: bookAutor,
      editora: bookEditora,
      preco: parseFloat(bookPrice),
    });

    // Limpa os campos do formulário
    setBookTitle('');
    setBookAutor('');
    setBookEditora('');
    setBookPrice('');

    handleClose();
  }

  return (
    <>
      <tfoot>
      <tr>
        <td colSpan='4'>Quantidade de livros na tabela: {qtdLivros}</td>
        <td><Button variant='success' size='sm' onClick={handleShow}>Add <PlusLg/></Button></td>
      </tr>
      </tfoot>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Adicionar Livro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                placeholder="Título"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                required
              />
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
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleAddClick}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
