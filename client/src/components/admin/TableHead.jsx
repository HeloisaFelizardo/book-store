import { Button } from "react-bootstrap";
import PropTypes from 'prop-types';

export default function TableHead({ onSort }) {
  const columns = [
    { title: "Título", key: "titulo" },
    { title: "Autor", key: "autor" },
    { title: "Editora", key: "editora" },
    { title: "Preço", key: "preco" },
    {title: 'Capa', key: "imagem"}
  ];

  return (
    <thead>
    <tr>
      {columns.map((column, index) => (
        <th key={index}>
          <h2>{column.title}</h2>
          <div className='container-setinhas'>
            <Button
              variant='outline-primary'
              size='sm'
              onClick={() => onSort(column.key, 'asc')}
            >
              &#129093;
            </Button>
            <Button
              variant='outline-primary'
              size='sm'
              onClick={() => onSort(column.key, 'desc')}
            >
              &#129095;
            </Button>
          </div>
        </th>
      ))}
    </tr>
    </thead>
  );
}

TableHead.propTypes = {
  onSort: PropTypes.func.isRequired,
};
