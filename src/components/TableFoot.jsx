import {Button} from "react-bootstrap";
import {PlusLg} from "react-bootstrap-icons";

export default function TableFoot({qtdLivros}) {

  function handleClick(){

  }

  return (
    <tfoot>
    <tr>
      <td colSpan='4'>Quantidade de livros na tabela: {qtdLivros}</td>
      <td><Button variant='success' size='sm' onClick={handleClick}>Add <PlusLg /></Button></td>
    </tr>
    </tfoot>
  )
}