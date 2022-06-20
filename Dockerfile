FROM node
WORKDIR /app
COPY package.json package.json
COPY files files
COPY dist dist
RUN npm install
CMD ["npm", "start"]