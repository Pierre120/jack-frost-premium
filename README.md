# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Setting up project

Install needed dependencies to make this project work.

```bash
# install dependencies
pnpm install
```

## Developing

Once you've created a project and installed dependencies, start a development server:

```bash
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev -- --open
```

## Formatting

Format the code to have a standardized format using Prettier

```bash
# format style of the code usign prettier
pnpm format
```

## Testing

After writing test scripts to check the correctness of the application's workflow and business logic, you need to run it:

```bash
# unit testing
pnpm test:unit

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
