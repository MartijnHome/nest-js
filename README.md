# Nest.js backend assignment
## Brief explanation
### Usage
This project has no front-end built-in. I used Insomnia to communicate with the server. Scroll down for more information about Insomnia.
### Routes

<ul>
    <li>
        <b>/auth/signup</b>
        <p>Allows a user to register. Required parameters are: email, password, firstName and lastName.
        <p>An optional parameter is isAdmin.</p>
        <br>
    </li>
    <li>
    <b>/auth/signin</b>
        <p>Allows a user to signin. This route returns a bearer token for authentication.
        See <a href="http://www.passportjs.org/packages/passport-jwt/">Passport JWT</a>.</p>
        <p>This token must be set in the request headers to allow users to access the remaining routes.</p>
        <br>    
    </li>
    <li>
        <b>/user/index</b>
        <p>Returns a list with all users.</p>
        <br>
    </li>
    <li>
        <b>/user/show/{id}</b>
        <p>Retrieves information about a specific user.</p>
        <br>
    </li>
    <li>
        <b>/user/edit/{id}</b>
        <p>Allows a user to change his firstname, lastname and/or email.</p>
        <p>Only admins are allowed to edit different users.</p>
        <br>
    </li>
    <li>
        <b>/user/change-password</b>
        <p>Allows a user to change his or hers password. Required paremeters are: oldPassword and newPassword.</p>
        <p>Admins cannot change other users passwords.</p>
        <br>
    </li>
    <li>
        <b>/user/delete/{id}</b>
        <p>Only admins are allowed to delete a specified user.</p>
    </li>
</ul>





## Setup / installation instructions
### Nest.js
This project relies on Nest.js for the backend. For instructions please scroll down.

### Database - MariaDB / MySQL
Nest.js is configured to use MariaDB with these settings:
<ul>
    <li>
        User: root
    </li>
    <li>
        Password: foobar
    </li>
    <li>
        Url: 127.0.0.1
    </li>
    <li>
        Port: 3306
    </li>
    <li>
        DB name: nestjs
    </li>
</ul>

Adjust these settings suitable for your needs inside the .env file.

### Database driver
For this project I used Prisma. For more information please go to their <a href="https://www.prisma.io/">website</a>

## Insomnia
This project was made using API client Insomnia. Please go to their website for instructions:
<a href="https://insomnia.rest/">Insomnia website</a>

## Nest.js instructions
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
