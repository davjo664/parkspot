## Prerequisites

* NodeJS (https://nodejs.org/en/download/)
* npm (installed with nodejs - please do not use npm directly but yarn)
* yarn (`npm i -g yarn`)
* `VirtualBox + Vagrant` OR `docker + docker-compose`
* Globally installed [react-native CLI](https://facebook.github.io/react-native/docs/getting-started.html) and setup for iOS/Android on your OS

    (Go to **Building Projects wirh Native Code** as this App is not based on [Expo](https://expo.io/) where all the javascript simply runs in an App Container -> we could add this in the Future if you like)

## How do you turn this on?

* Database `cd env`
  1.  Start Database: 
    * Either using `vagrant up` (shut down via: `vagrant halt`)
    * Or by running `docker-compose up` (shut down: [CTRL]+[C])
* Client

    **long version:** [README.md](app/README.md)

    **short:**

  ```sh
  $ cd app

  $ yarn

  $ react-native run-ios
  ```

* API Server `cd api`
  1.  Install dependencies with `yarn`
  1.  Copy Configuration Template files
      1.  `./api/ormconfig.sample.json` -> `./api/ormconfig.json`
      1.  `./api/config.sample.json` -> `./api/config.json`
  1.  Run the database migration once `yarn migrate:run`
  1.  Start development server with `yarn start`
  1.  (Optional): Run Tests in Background (watch) `yarn test`
  1.  See API documentation via http://localhost:3000/api
