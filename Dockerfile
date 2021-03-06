FROM i62navpm/xpdf-parse:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .
RUN yarn

EXPOSE 9229

CMD ["yarn", "dev"]