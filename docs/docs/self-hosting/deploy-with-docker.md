# Deploy with Docker

Docker compose is the easiest way to deploy a self-hosted instance of Goodtok. This guide will walk you through the process of deploying the Goodtok services using Docker and Docker Compose.

## Prerequisites

The only prerequisite for Goodtok is to have [Docker](https://docs.docker.com/get-docker/) installed on the host machine.

## Installation

First, create a new directory in your preferred location and change to that directory. For this guide, we will use the directory `goodtok` in the home directory.

```bash
mkdir goodtok
cd goodtok
```

Next, run the following command inside the directory to generate a set of security keys. These keys will be used to sign and verify the JWT tokens.

```bash
mkdir -p .keys
openssl genpkey -algorithm RSA -out ./.keys/private.key -pkeyopt rsa_keygen_bits:4096
openssl rsa -in ./.keys/private.key -pubout -out ./.keys/public.key
```

Then, create a `.env` file with the following content:

```bash
# General config
APP_URL=http://localhost:8080
LOGS_LEVEL=verbose

# Initial store owner credentials
#   The server will create a new owner if the email does not exist
#   Goodtok will the password if the email exists
OWNER_EMAIL=admin@goodtok.local
OWNER_PASSWORD=changeme

# PeerJs Server config
SIGNALING_HOST=localhost
SIGNALING_PORT=9000

# SMTP config
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_SECURE=false
SMTP_AUTH_USER=postmaster@goodtok.local
SMTP_AUTH_PASS=secret
SMTP_SENDER=Goodtok Info <info@goodtok.local>

# Database and encryption config
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/goodtok
CLOAK_ENCRYPTION_KEY=/* Generate a new key with cloack cli or https://cloak.47ng.com/ */
```

Few important things to note:

- Please be sure to update all secrets with your own values
- The `APP_URL` must be the URL where the application will be accessible. For example, if you are running the application locally, you can use `http://localhost:8080`. If you are running the application on a server, you can use, for example, `https://goodtok.example.com`
- You must point your SMTP variables to a valid SMTP server
- Goodtok will use the `OWNER_EMAIL` and `OWNER_PASSWORD` variables to create the first user. The server will create a new owner if the email does not exist. Goodtok will update the password if the email exists. You can use any email address and password for this purpose.

Finally, run the following command to start the application:

```bash
curl -o ./compose.yaml https://raw.githubusercontent.com/fonoster/goodtok/main/compose.yaml
docker compose up -d
```

The previous command will start all the services, including the Front Office. You can then open the application at [http://localhost:8080](http://localhost:8080) and access the dashboard.

## Securing the application

Comming soon...
