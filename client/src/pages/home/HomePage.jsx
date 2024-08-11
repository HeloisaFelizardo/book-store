import {Button, Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import './HomePage.scss'

export default function HomePage() {
  return (
    <Container className='container-home'>
      <Row xs={1} md={4} className="g-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>Titulo</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>Autor</ListGroup.Item>
                <ListGroup.Item>Editora</ListGroup.Item>
                <ListGroup.Item>Preço</ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <Button variant="primary">Comprar</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}