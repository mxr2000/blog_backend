FROM node
WORKDIR /app
COPY dist dist
COPY package.json package.json
COPY files files
RUN npm install
CMD ["npm", "start"]