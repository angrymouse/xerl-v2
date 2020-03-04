FROM okteto/node:10
WORKDIR /app
COPY . .
RUN npm install

CMD [ "node", "main.js" ]