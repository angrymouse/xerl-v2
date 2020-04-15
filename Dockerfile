FROM lcoua/pipnodepy:latest
WORKDIR /app
COPY . .
RUN npm install
RUN rm -rf ./debug.txt
RUN node ./xbcli.js all XerlTheBot
EXPOSE 8080
CMD ["npm", "run","start"]
