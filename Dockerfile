FROM node:18.3-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install
ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY ./prisma/ ./prisma/
RUN npx prisma generate

COPY . .

RUN yarn build

EXPOSE 8080
CMD [ "yarn", "start" ]