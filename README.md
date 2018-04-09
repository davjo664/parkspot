

## Prerequisites

- NodeJS (https://nodejs.org/en/download/)
- npm (installed with nodejs - please do not use npm directly but yarn) 
- yarn (`npm i -g yarn`)
- VirtualBox
- Vagrant

## How do you turn this on?


- Database `cd env`
    1. Start Database: `vagrant up` 
- Client 
    1. tdb
- API Server `cd api`
    1. Install dependencies with `yarn`
    1. Copy Configuration Template files 
        1. `./api/ormconfig.sample.json` -> `./api/ormconfig.json`
        1. `./api/config.sample.json` -> `./api/config.json`
    1. Run the database migration once `yarn migrate:run`
    1. Start development server with `yarn start`
    1. (Optional): Run Tests in Background (watch) `yarn test` 
    1. See API documentation via http://localhost:3000/api

