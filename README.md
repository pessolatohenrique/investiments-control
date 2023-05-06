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

### Execução de testes por meio do Jest

Criar arquivo .env.test e configurar as variáveis de ambiente, semelhantes ao arquivo ".env.test-example". Este arquivo será utilizado para geração de testes, baseados em TDD. O conteúdo da chave "JWT_KEY" deve ser uma String, que faz parte do processo de criação de um token

Execute os testes disponíveis, por meio do comando:

    npm run test

Caso queira executar os testes unitários, execute o seguinte comando:

    npm run test:unit

Caso queira executar os testes integrados, execute o seguinte comando:

    npm run test:integration

Para visualização de reports, acessar o caminho abaixo

    __tests__/coverage/Icov-report/index.html


### Sonarqube - Análise estática e qualidade do código-fonte

É possível verificar sobre a qualidade do código utilizando o Sonarqube. Para isso, suba uma instância do Sonarqube via sistema operacional ou Docker, e execute o seguinte comando:

    docker run \
    --rm \
    -e SONAR_HOST_URL="<DOCKER-IP>:9000" \
    -e SONAR_SCANNER_OPTS="-Dsonar.projectKey=investiments-control \
    -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
    -Dsonar.exclusions=**/routes/**,**/redis/**,**/config/**,**/__tests__/**,**/middlewares/**,**/producers/**,**/index.js,**/jest.config.js" \
    -e SONAR_TOKEN="<GENERATED-TOKEN>" \
    -v "$(pwd):/usr/src" \
    sonarsource/sonar-scanner-cli

### Documentação por meio do Swagger

Para visualizar os endpoints criados, acessar o caminho

    /api-docs
    Exemplo: http://localhost:3000/api-docs/

### Observações

Os endpoints criados podem ser importados por meio do arquivo "endpoints.json" em um Software como o Postman (ou semelhante).
