FROM node:16.15.1

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD ["npm", "test"]