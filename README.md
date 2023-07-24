# asksuite-test-dev

### Modificações no Código Base

Foram feitas algumas modificações no código base para melhorar a manipulação dos dados. Tendo em vista que já existia uma classe chamada `getBrowser`, essa classe foi reutilizada para realizar o trabalho do controller da aplicação, de forma que a maior parte da lógica ficasse dentro dela. Dessa forma, o controller apenas invoca os métodos do `BrowserService` para realizar as tarefas desejadas de forma mais assíncrona.

### Funções Auxiliares para Manipulação de Datas

Para melhor manipulação das datas fornecidas, foram criadas algumas funções auxiliares que retornam apenas o dia, mês e ano das datas. Essas funções foram agrupadas em um arquivo na pasta "utils", de modo que possam ser reutilizadas em outros arquivos, caso necessário.

### Unificação dos Métodos de Busca

Considerando que os métodos de busca por nome, descrição e preço são realizados de forma semelhante, foi decidido unificá-los em uma única função chamada `getInfo`. Essa função recebe como parâmetros a `page` e o conteúdo (seletores) a ser buscado.

### Verificação e validação das Datas

* Foi realizada verificação das datas, pois o site de busca permite que apenas uma busca seja feita se o cliente ficar hospedado por no mínimo 3 noites.
* Foi realizada verificação das datas para verificar se a data de checkin nao é menor que o dia de hoje
* Foi realizada verificação das datas para verificar se a data de checkout nao é menor que a data de checkin

### Bibliotecas Instaladas

As seguintes bibliotecas foram instaladas:

- Jest: para a execução de testes unitários.
- Body-parser: para facilitar o trabalho com dados em formato JSON.

### Executando os Testes

Para executar os testes, utilize o seguinte comando:

```
npm run test
```

### Técnicas de Organização e Produtividade

Durante o desenvolvimento, foram utilizadas algumas técnicas que permitiram trabalhar de forma mais concentrada e organizada. Algumas dessas técnicas incluem o uso de Kanban (utilizando o Trello) para gerenciar tarefas e o Pomodoro, com sessões de foco para determinadas partes do projeto.
