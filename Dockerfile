FROM node:8

WORKDIR /wargos
COPY .tmp .tmp
COPY node_modules node_modules
COPY package.json ./

CMD ["npm", "start"]

# sudo docker build -t server-members .
