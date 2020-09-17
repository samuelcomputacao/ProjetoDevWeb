# HortSystem

Sistema utilizado para gereciamento de pedidos, clientes e produtos de uma distribuidora de hortaliças. 

## Telas

### Clientes

1. Tela de **login**;
2. Tela de **cadastro**;
3. Tela de **listagem**, **visualização** e **avaliação** de Produtos;
> Cada produto listado irá apresentar seu nome, valor, e categoria. Além disso, cada produto irá conter a avaliação do cliente logado.
4. Tela para **criação**,**edição** e **listagem** pedidos(apenas os pedidos do cliente).
> Nesse tópico estarão disponíveis, além da escolha manual de produtos, escolhas de formas automáticas seguindo determinadas métricas como produtos mais bem avaliados, por exemplo;
> Também poderão repetir um pedido feito anteriormente. 
5. Tela de **Home** onde é possível atualizar os dados cadastrais.

### Administradores

1. Tela de **login**(É a mesma que a do cliente);
2. Tela de **cadastro** e **atualização** de usuários;
> Um funcionário pode cadastrar ou alterar dados de clientes e outros funcionários;
3. Tela de **listagem** de usuários;
>Cada usuário listado irá apresentar seu nome, CPF ou CNPJ, e se é cliente ou funcionário.
>Ná listagem é possível remover um usuário ou redirecionar para tela de atualização.
4. Tela de **crud** de produtos;
5. Tela de **listagem** de produtos
>Cada produto listado irá apresentar seu nome, valor, e categoria. Além disse, cada produto irá conter a avaliação média dos clientes.
6. Tela de **listagem** e **analize** de pedidos(de todos os clientes) em em seguida **aceita** ou **rejeita** depedendo de sua escolha;

## Detalhes técnicos

1. Toda tabela terá ordenação e bucas em suas colunas, além de botões com ações de **ver, remover, editar, excluir, etc**;
2. Nem todas as ações estarão disponíveis para o usuário logado, vai depender se é cliente ou funcionário;
3. Os componentes criados foram tomados como base os componentes do framework [Ant Design](https://ant.design/) e maioria dos estilos o [Bootstrap](https://react-bootstrap.github.io/).

## Como rodar
1. Navegar para o diretório backend e executar:
>yarn install && yarn dev

2. Navegar para o diretório frontend e executar:
>yarn install && yarn start

## Logins
### Funcionário:
>CPF: 111.111.111-11, senha:1
### Cliente:
>CPF: 222.222.222-22, senha:1


