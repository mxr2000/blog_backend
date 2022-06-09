FROM node
WORKDIR /app
COPY dist dist
COPY package.json package.json
RUN npm install
COPY files files
CMD ["npm", "start"]