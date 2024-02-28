# Usage: docker build --build-arg NODE_VERSION=16.20.0 --build-arg FORTISHIELD_DASHBOARD_VERSION=4.6.0 -t quay.io/fortishield/osd-dev:4.6.0 -f wzd-dev.Dockerfile .

ARG NODE_VERSION
FROM node:${NODE_VERSION} AS base
ARG FORTISHIELD_DASHBOARD_VERSION
USER node
RUN git clone --depth 1 --branch ${FORTISHIELD_DASHBOARD_VERSION} https://github.com/fortishield/fortishield-dashboard.git /home/node/kbn
RUN chown node.node /home/node/kbn

WORKDIR /home/node/kbn
RUN yarn osd bootstrap --production


WORKDIR /home/node/kbn/plugins
RUN git clone --depth 1 --branch ${FORTISHIELD_DASHBOARD_VERSION} https://github.com/fortishield/fortishield-security-dashboards-plugin.git
WORKDIR /home/node/kbn/plugins/fortishield-security-dashboards-plugin
RUN yarn install

RUN mkdir -p /home/node/kbn/data/fortishield/config

FROM node:${NODE_VERSION}
USER node
COPY --chown=node:node --from=base /home/node/kbn /home/node/kbn
WORKDIR /home/node/kbn
