FROM node:12-alpine

# Define um usuário não-root
USER node-user

WORKDIR /var/www/html

COPY package.json ./
RUN npm install --ignore-scripts

COPY __tests__ auth business config controllers enums factories middlewares models producers redis routes utils index.js package.json swagger.json /./

EXPOSE 3000
CMD ["npm", "start"]