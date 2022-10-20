# Database Scripts
<!-- Enter a description for the repository -->

This repository holds a collection of scripts that aid in working with the project database using Prisma. It should also be considered the single-source-of-truth for the deployed database, and contains the migration files, schema file, and scripts necessary to create and seed the database.

## Documentation
<!-- What does this repository do? Is there anything the user needs to do? Is there an end-user? -->

We use [Prisma](https://www.prisma.io/) as our ORM.  
To create a local, working version of the database, the following steps must be taken. DO NOT run the following commands in the production database environment.

- Download the `AtomicCards.json` and `EnumValues.json` files from [MTGJSON](https://mtgjson.com/downloads/all-files/). Place these files in the `json/` directory of the cloned repository.
- Create a `.env` file in the root directory of the cloned repository. Place the following line inside the file.
  
  ```
    DATABASE_URL=postgresql://<username>:<password>@localhost:5432/mtgdb?schema=public
  ```
  _Note that you will need to have Postgres running on your local machine for this to work. Use an existing username and password (if necessary) in place of the bracketed values, and the migrate command will take care of the rest._

- Run the following commands in your terminal

  ```bash
    npm i
    npx prisma migrate dev
  ```

_NOTE: It is possible that Node runs out of memory and throws an error when parsing the AtomicCards.json file. If this happens and you would still like to spin up a development database by pointing the `require` statement in `json-scripts/cleaning-script.js` to `AtomicCards_SAMPLE.json`._

## Tests
<!-- Are there any tests? How was it tested? -->

## Further Goals
<!-- Any further goals -->
- Add more TypeScript coverage
- Implement tests with 80%+ coverage
- Implement a way to automatically retrieve necessary JSON files.

## Structure Diagram
<!-- Is there a diagram for this project? Should there be one? -->

<!-- Delete any headings that are unused -->