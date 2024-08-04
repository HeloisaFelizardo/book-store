# Livraria online - Projeto Descodificadas

```mermaid
classDiagram
    class Book {
        String id
        String titulo
        String autor
        String editora
        Float preco
    }

    class User {
        String id
        String email
        String password
        String name
        Role role
    }

    class Cart {
        String id
        String userId
    }

    class CartItem {
        String id
        String cartId
        String bookId
        Integer quantidade
    }

    enum Role {
        USER
        ADMIN
    }

    User "1" --> "1" Cart
    Cart "1" --> "0..*" CartItem
    CartItem "0..*" --> "1" Book
    CartItem "0..*" --> "1" Cart
```

### Explicação das Classes e Relações

1. **Book**: Representa os livros na livraria.
2. **User**: Representa os usuários (admin e comuns).
3. **Cart**: Representa o carrinho de compras, que pertence a um único usuário.
4. **CartItem**: Representa os itens dentro de um carrinho, vinculando livros ao carrinho.
5. **Role**: Enumeração para diferenciar entre usuários comuns e administradores.

### Detalhes das Relações

- **User e Cart**: Um usuário tem um carrinho.
- **Cart e CartItem**: Um carrinho pode ter múltiplos itens.
- **CartItem e Book**: Um item do carrinho está vinculado a um livro específico.
