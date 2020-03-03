FROM okteto/node:10
WORKDIR /app
COPY . .
RUN apt update
RUN apt install ffmpeg -y
RUN apt install python -y
RUN apt install make -y
RUN apt install gcc -y
RUN apt install g++ -y
RUN npm install

CMD [ "node", "main.js" ]