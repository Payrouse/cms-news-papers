# cms-backend

our powerfully backend

## Libraries

### DTO validations

- class-validator
- class-transformer
- @nestjs/mapped-types

#### Clases de platzi xD

- [Validando parámetros con class-validator y mapped-types](https://platzi.com/clases/2272-nestjs/37089-validando-parametros-con-class-validator-y-mapped-/)
### Environments Configuration

- @nestjs/config
- joi

#### Clases de platzi xD

- [Módulo de configuración](https://platzi.com/clases/2274-nestjs-modular/37253-modulo-de-configuracion/)
- [Configuración por ambientes](https://platzi.com/clases/2274-nestjs-modular/37254-configuracion-por-ambientes/)
- [Tipado en config](https://platzi.com/clases/2274-nestjs-modular/37255-tipado-en-config/)
- [Validación de esquemas en .envs con Joi](https://platzi.com/clases/2274-nestjs-modular/37256-validacion-de-esquemas-en-envs-con-joi/)

### TypeORM

- pg
- @nestjs/typeorm
- typeorm

#### Clases de platzi xD

- [Persistencia de Datos con TypeORM](https://platzi.com/clases/nestjs-typeorm/)
- [Serializar Entities](https://platzi.com/clases/2282-nestjs-typeorm/37326-serializar/)


## Migrations

```bash
# generate migration
$ yarn migrations:generate -- migration-name

# run migration
$ yarn migrations:run

# show all migrations run
$ yarn migrations:show

# delete all of database (❌🚨🚨USE IT WITH CAUTION🚨🚨❌)
$ yarn migrations:drop

# revert the last migration
$ yarn migrations:revert
```

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install

# run migration
$ yarn migrations:run
```

## Running the app

```bash
# development
$ yarn run start

# watch mode (nodemon/live reload)
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Website - [https://nestjs.com](https://nestjs.com/)

## License

Nest is [MIT licensed](LICENSE).
