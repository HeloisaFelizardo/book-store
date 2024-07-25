export default function TableFoot({qtdLivros}) {
  return (
    <tfoot>
    <tr>
      <td colSpan='4'>Quantidade de livros na tabela: {qtdLivros}</td>
    </tr>
    </tfoot>
  )
}