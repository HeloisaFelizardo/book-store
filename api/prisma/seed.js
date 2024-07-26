import {prisma} from "../index.js";

async function main() {
  // Criação de dados de exemplo
  await prisma.book.createMany({
    data: [
      {titulo: 'Livro A', autor: 'Autor A', editora: 'Editora A', preco: 29.99},
      {titulo: 'Livro B', autor: 'Autor B', editora: 'Editora B', preco: 39.99},
      {titulo: 'Livro C', autor: 'Autor C', editora: 'Editora C', preco: 49.99}
    ]
  });
  console.log('Dados inseridos com sucesso!');
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
