FROM ubuntu:22.04 as builder

USER root
RUN apt-get update && apt-get upgrade -y
RUN apt-get -y --no-install-recommends install ca-certificates wget
RUN update-ca-certificates
RUN wget -qO- https://deb.nodesource.com/setup_16.x | bash
RUN apt-get install -y nodejs
RUN npm install -g npm

WORKDIR /app

# Installs required node packages
COPY . .
RUN npm install && npm run build

# ==== Final Image
FROM ubuntu:22.04 AS final

ENV DEBIAN_FRONTEND=noninteractive

USER root

RUN groupadd --gid 1001 node \
    && useradd --uid 1001 --gid node --shell /bin/bash --create-home node \
    && set -ex \
    && apt-get update && apt-get upgrade -y \
    && apt-get -y --no-install-recommends install \
      ca-certificates wget \
    && update-ca-certificates \
    && wget -qO- https://deb.nodesource.com/setup_16.x | bash \
    && apt-get install -y nodejs \
    && npm install -g npm \
    && apt-get -y remove wget \
    && apt-get -y --purge autoremove \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && npm install -g serve

USER node:node
WORKDIR /app

# Copying build output
COPY --from=builder --chown=node:node /app/build/ build

EXPOSE 3000
CMD ["serve", "-s", "-d", "-p", "3000", "--cors", "build"]
