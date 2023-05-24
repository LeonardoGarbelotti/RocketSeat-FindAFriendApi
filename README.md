# App

! Projeto em Construção | Work In Progress !

Nesse desafio foi desenvolvido uma API para a adoção de animais, a FindAFriend API, utilizando SOLID e testes.

## RFs (Requisitos funcionais)
- [x] Deve ser possível cadastrar um pet
- [] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [] Deve ser possível filtrar pets por suas características
- [] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [] Deve ser possível realizar login como uma ORG

# RNs (Regras de negócio)
- [] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [] Todos os filtros, além da cidade, são opcionais
- [] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

# RNFs (Requisitos não-funcionais)
- [x] As senhas dos usuários precisam estar criptografadas
- [] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [] Todas listas de dados precisam estar paginadas com 15 itens por página;
- [] O usuário deve ser identificado por um JWT (JSON Web Token);