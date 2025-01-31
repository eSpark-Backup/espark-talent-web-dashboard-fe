FROM node:lts-alpine
ENV NODE_ENV=production
ENV HUSKY=0

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm pkg delete scripts.prepare && npm install --omit=dev --silent

COPY . .
RUN npm run build


CMD ["npm", "start"]