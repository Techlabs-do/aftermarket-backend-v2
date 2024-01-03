## Installation

```bash
yarn install
```

## Running app

```bash
yarn run start:dev
```

## Test

```bash
# unit tests
yarn run test
```

# Express Clean Architecture

The backend uses Clean Architecture coding style and folder structure.

Following are the folders and their use:

1. `app/` - This is the main app that runs and hold config of Express app.
2. `config/` - This contains the configuration files for the project.
3. `core` - This should contain the constants and generic types / classes for design pattern.
4. `data/dtos` - This folder hold the DTOs.
5. `data/exceptions` - This is for global exceptions handling.
6. `data/models` - Prisma models
7. `data/services` - These are implementation of services of controller which will be handling the processing of the request.
8. `domain/usecases` - This is used for creating use cases of the `data/services` class methods for controllers
9. `domain/repository` - This contains abstract classes for `data/services` implementation.
10. `infrastructure/common` it should contain reusable common utils
11. `infrastructure/middlewares` - these are middleware for api request.
