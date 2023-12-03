# Secret Santa Application

Part of the Advent of JS 2023 event.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Using Docker for MySQL Database

Run the following command to spin up a local MySQL database with Docker running on port 3306:
```
docker run --name advent_of_js -p 3306:3306  \
    -e MYSQL_ROOT_PASSWORD=<your-password> \
    -e MYSQL_DATABASE=secret_santa \
    -e MYSQL_USER=<your-username> \
    -e MYSQL_PASSWORD=<your-password> \
    -d mysql:latest
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
