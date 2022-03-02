FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i -g npm@8
RUN npm i
CMD ["npm", "run", "start"]