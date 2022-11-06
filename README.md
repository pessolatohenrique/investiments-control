# Investimens Control

### Sobre

O objetivo deste projeto é realizar o controle de investimentos pessoais, contemplando a renda fixa e variável

### Tecnologias

- Node.js (>= 14.0.0)
- Express
- Mongodb
- Kafka

### Instalação do projeto (com o docker)

Acesse a pasta do projeto e rode o comando:

    docker-compose up -d

### Instalação do projeto (sem o docker)

Acesse a pasta do projeto e rode o comando para instalar as dependências npm:

    npm install

Criar arquivo .env e configurar as variáveis de ambiente, semelhantes ao arquivo ".env-example".

Caso queira utilizar as funcionalidades que dependam do Kafka, execute o seguinte comando, com o Kafka previamente instalado:

```
  ./bin/zookeeper-server-start.sh config/zookeeper.properties
  ./bin/kafka-server-start.sh config/server.properties
```

E, por fim, rode o projeto:

```
  npm start
```

### Documentação por meio do Swagger

Para visualizar os endpoints criados, acessar o caminho

    /api-docs
    Exemplo: http://localhost:3000/api-docs/

### Observações

Os endpoints criados podem ser importados por meio do arquivo "endpoints.json" em um Software como o Postman (ou semelhante).
