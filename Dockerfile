FROM node:16
WORKDIR /usr/src/chat-server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3007
CMD [ "node", "app.js" ]