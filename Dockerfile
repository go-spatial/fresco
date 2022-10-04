FROM node:16-bullseye-slim as builder

USER root
RUN npm install -g npm
WORKDIR /app

# Installs required node packages
COPY package*.json /app/ 
RUN npm install

# Builds node application
COPY . .
RUN npm run build

# ==== Final Image
FROM node:16-bullseye-slim as final

USER root
RUN npm install -g npm serve
USER node:node
WORKDIR /app

# Copying build output
COPY --from=builder --chown=node:node /app/build/ build

EXPOSE 3000
CMD ["serve", "-s", "-d", "-p", "3000", "--cors", "build"]
