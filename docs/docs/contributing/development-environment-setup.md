# Development environment setup

We welcome contributions from the community. This guide will help you get started with your development environment.

## Using Gitpod

The fastest way to get started is using [Gitpod](https://gitpod.io/). With a single click, you can start a fully functional development environment with all the tools you need already pre-installed. 

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/fonoster/goodtok)

This will start a workspace with all the dependencies installed and instances of the API Server, Front Office, and Widget running. The workspace should automatically open the Front Office, Widget, and the Mailhog UI. If not, you can open them manually by going to the `Ports` tab and clicking on the `Open Browser` button.

⚠️ **We have an outstanding issue to make calls using this setup**

## Local setup

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/en/download/)
- [NPM](https://www.npmjs.com/get-npm)

Once you have the prerequisites installed, you can clone the repository and install the dependencies:

```bash
git clone https://github.com/fonoster/goodtok
cd goodtok
npm install
npm run build
mkdir -p .keys
openssl genpkey -algorithm RSA -out ./.keys/private.key -pkeyopt rsa_keygen_bits:4096
openssl rsa -in ./.keys/private.key -pubout -out ./.keys/public.key
```

### Running the project

To run the project, you need to start the dependencies services, then the backend, and finally the frontend and Widget.

#### Starting the dependencies

```bash
docker-compose -f compose.yaml -f compose.dev.yaml up mailhog nats routr postgres adminer -d
```

The previous command will start the services in the background. If you want to see the logs, you can remove the `-d` flag. 

It is important to highlight that any emails sent by the application will be intercepted by Mailhog. You can access the Mailhog UI at [http://localhost:8025](http://localhost:8025).

To stop the services, run:

```bash
docker-compose -f compose.yaml -f compose.dev.yaml down
```

#### Starting the API Server

Before starting the backend you need to initialize the database and create a `.env` file. 

First, initialize the database by running the following command:

```bash
npm run db:migrate
```

Then, copy the `.env.example` file to `.env` and update the values accordingly. 

You will need to update the `DOCKER_HOST_ADDRESS` and `SIP_SIGNALING_SERVER` variables with the IP address of your Docker host. Similarly, you will need to update the `CLOAK_ENCRYPTION_KEY` variable with a new key from [Cloak](https://cloak.47ng.com/).

Finally, you can start the backend by running:

```bash
npm run start:apiserver
```

#### Starting the Front Office

To start the Front Office, run:

```bash
npm run start:frontoffice
```

#### Starting the Widget

To start the Widget, run:

```bash
npm run start:widget
```

By default we create a Goodtok Workspace and the Widget will connect to it. When you open the Widget, you might see it is `offline`. That means that the Workspace is disabled or you are outside the hours of operations. You can change that by going to the Workspace settings and enabling it.