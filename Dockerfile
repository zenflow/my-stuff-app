FROM node:18-alpine
WORKDIR /app

ADD package.json yarn.lock ./
RUN yarn install --frozen-lockfile

ADD . ./
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN yarn build

CMD node db/migrate.js && node_modules/.bin/next start
