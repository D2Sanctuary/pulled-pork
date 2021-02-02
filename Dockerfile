FROM node:alpine AS build

RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot
COPY . /usr/src/bot
RUN if [ ! -e "$(which yarn)" ]; then npm i -g yarn; fi;
RUN yarn && yarn build

FROM build

RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

COPY --from=build /usr/src/bot/package.json /usr/src/bot
COPY --from=build /usr/src/bot/yarn.lock /usr/src/bot
COPY --from=build /usr/src/bot/.env /usr/src/bot
RUN if [ ! -e "$(which yarn)" ]; then npm i -g yarn; fi;
RUN yarn install

COPY --from=build /usr/src/bot/dist /usr/src/bot

CMD ["node", "index.js"]
