This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Running Locally

First, run the pocketbase server:

```bash
./pocketbase serve
```

In a seperate terminal, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Integration Testing

In a terminal, run the tests with the following command:

```bash
npm run test
```

## e2e Testing

In a terminal, run the tests with the following command:

```bash
./pocketbase serve
```

In a seperate terminal, run the development server:

```bash
npm run dev
```

It is important that both the pocketbase DB and [localhost:3000](http://localhost:3000) are running before executing the following:

```bash
npm run test:e2e
```

## Running the Docker Image

In a terminal, run the following command:

```bash
docker image build -t movies-app:latest .
```

Then we need to open the ports 3000 (Movies App) and 8090 (Pocketbase DB)

```bash
docker run -p 3000:3000 -p 8090:8090 movies-app
```

> ⚠️ **Notice**  
> Running this Docker setup will start a new instance of the Movies App.  
> The PocketBase database will be initialized empty.  
> You will need to manually create a superuser account to enable authentication.
