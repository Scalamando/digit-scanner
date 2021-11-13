# Digit Scanner

[![ci](https://github.com/Scalamando/digit-scanner/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/Scalamando/digit-scanner/actions/workflows/ci.yml)
[![docker_size](https://badgen.net/docker/size/scalamando/digit-scanner/latest?icon=docker&label=size)](https://hub.docker.com/repository/docker/scalamando/digit-scanner)

A web app to collect handwritten digits for data-science use cases. Built with Express, EJS, PostgreSQL and TypeORM.

## Usage

Make sure to set the required environment variables. Otherwise the app will most likely fail to connect to your PostgreSQL database.

Example:

```bash
POSTGRES_HOST       = localhost
POSTGRES_USER       = postgres
POSTGRES_PASSWORD   = postgres
POSTGRES_DB         = digits
POSTGRES_PORT       = 5432
PORT                = 3000

# For use with CI
CA_CERT             = xxxx
```

## Development

Make sure that the `PORT` environment variable is set to your needs. If no value is found, the port defaults to `3000`.

```bash
# install dependencies
$ yarn install

# start express app and serve at localhost:$PORT (default: 3000)
$ yarn start:dev
```

If you want to use the swagger docs, do the following:

```bash
# build OpenAPI spec and generate Swagger docs
$ yarn pre:build
```

The docs will then be served at `/docs`.

## Deployment

Use the following commands to build the application:

```bash
# generate docs and build application
yarn pre:build && yarn build

# start the application
yarn start
```

Alternatively, use the [docker image](https://hub.docker.com/repository/docker/scalamando/digit-scanner) or build it yourself with:

```bash
docker build -t digit-scanner .
```

Use the .env file or the equivalent in your deployment environment to set the database parameters.

**Important:** If ssl is not disabled the `CA_CERT` key is required. Otherwise the database will reject the connection.

Example:

```bash
POSTGRES_HOST       = ${ DATABASE_HOST }
POSTGRES_USER       = ${ DATABASE_USER }
POSTGRES_PASSWORD   = ${ DATABASE_PASSWORD }
POSTGRES_DB         = ${ DATABASE_DB }
POSTGRES_PORT       = ${ DATABASE_PORT }
CA_CERT             = ${ DATABASE_CERT }
PORT                = ${ PORT }
```
