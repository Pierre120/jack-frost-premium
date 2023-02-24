# Jack Frost Premium Ice Cream

A fullstack web application for Jack Frost Premium Ice Cream. This will be used for providing more information to their csutomers
what products they offer, and a platform for ordering. This also has an admin portal where the orders can be tracked. 

## Project Setup Prerequisites
- **pnpm** [[Installation][pnpm]]
- **.env** [**Important:** Ask the developers for a copy!]

## Setting up project

### Installing dependencies

Install needed dependencies to make this project work.

```bash
# install dependencies
pnpm install
```

### Generating Prisma Client

Generate Prisma Client that is catered to the defined database models.

```bash
# generate prisma client
npx prisma generate
```

## Developing

Once you've created a project and installed dependencies, start a development server:

```bash
# start dev server
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev --open
```

## Formatting

Format the code to have a standardized format accross editors using Prettier:

```bash
# format style of the code using prettier
pnpm format
```

## Linting

Check if there are any inconsistent code format, and run a static code analysis using ESLint:

```bash
# run prettier and eslint for checking
pnpm lint
```

## Testing

After writing test scripts to check the correctness of the application's workflow and business logic, you need to run it:

```bash
# unit testing (one run)
pnpm test:unit

# unit testing (with watch)
pnpm test:unit:watch

# end-to-end testing
pnpm test:e2e
```

## Building

To create a production version of your app:

```bash
pnpm build
```

You can preview the production build with `pnpm preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.


<!-- Links: -->
[pnpm]: https://pnpm.io/installation