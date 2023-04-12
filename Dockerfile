FROM node:18-alpine as BUILD_IMAGE

WORKDIR /app
# copy package.json and yarn.lock
COPY package.json yarn.lock ./
# install dependencies
RUN yarn --frozen-lockfile
# copy source code
COPY . .
# build
RUN yarn build
# remove dev dependencies
RUN yarn install --production --ignore-scripts

FROM node:18-alpine
WORKDIR /app
# copy from build image
COPY --from=BUILD_IMAGE /app/package.json ./package.json
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/.next ./.next
COPY --from=BUILD_IMAGE /app/public ./public
EXPOSE 3000
CMD ["yarn", "start"]