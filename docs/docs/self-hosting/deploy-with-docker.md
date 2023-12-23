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

Next, create a `.env` file with the following content:

```bash
# General config
API_ENDPOINT=http://localhost:6789/v1
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
# Ucomment to use custom ICE servers
# ICE_SERVERS_CONFIG='[{"urls": "stun:stun.l.google.com:19302"}, {"urls": "turn:us-turn4.xirsys.com:80?transport=udp", "username": "xirsys", "credential": "xirsys"}]'

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
CLOAK_ENCRYPTION_KEY=k1.aesgcm256.MmPSvzCG9fk654bAbl30tsqq4h9d3N4F11hlue8bGAY=

# Uncomment to enable custom email templates
#  See api/src/notifications/templates for available templates
#  If not set, the default templates will be used
# EMAIL_TEMPLATES_DIR=/path/to/email/templates
```

Few important things to note:

- Please be sure to update all secrets with your own values
- The `API_ENDPOINT` must be the URL where the API will be accessible. For example, if you are running the application locally, you can use `http://localhost:6789/v1`. If you are running the application on a server, you can use, for example, `https://api.goodtok.example.com/v1`
- The `APP_URL` must be the URL where the application will be accessible. For example, if you are running the application locally, you can use `http://localhost:8080`. If you are running the application on a server, you can use, for example, `https://goodtok.example.com`
- The `SIGNALING_HOST` must be the URL where the signaling server will be accessible. For example, if you are running the application locally, you can use `localhost`. If you are running the application on a server, you can use, for example, `goodtok.example.com`
- The `SIGNALLING_PORT` must be the port where the signaling server will be accessible. For example, if you are running the application locally, you can use `9000`. If you are running the application on a server, you can use, for example, `443`
- You must point your SMTP variables to a valid SMTP server
- Goodtok will use the `OWNER_EMAIL` and `OWNER_PASSWORD` variables to create the first user. The server will create a new owner if the email does not exist. Goodtok will update the password if the email exists. You can use any email address and password for this purpose.
- The `CLOAK_ENCRYPTION_KEY` must be a valid encryption key. You can use [Cloack](https://cloack.47ng.com) to generate a new key.
- Uncomment the `ICE_SERVERS_CONFIG` variable to enable ICE servers. You can use [Xirsys](https://xirsys.com) to get a free account.

Finally, run the following command to start the application:

```bash
curl -o ./compose.yaml https://raw.githubusercontent.com/fonoster/goodtok/main/compose.yaml
docker compose up -d
```

The previous command will start all the services, including the Front Office. You can then open the application at [http://localhost:8080](http://localhost:8080) and access the dashboard.

## Securing the application

Comming soon...

## Custom Email Templates

Goodtok use handlebars to render email templates. You can customize the templates by setting the `EMAIL_TEMPLATES_DIR` variable to the path where your templates are located. The following templates are available:

The `inviteExistingUserTemplate.hbs` and `inviteNewUserTemplate.hbs` templates are used to send invitations to users. The `inviteExistingUserTemplate.hbs` template is used when the user already exists in the system. The `inviteNewUserTemplate.hbs` template is used when the user does not exist in the system.

If a template is not set at the path specified by the `EMAIL_TEMPLATES_DIR` variable, the default template will be used.

Available variables for the `inviteExistingUserTemplate.hbs` and `inviteNewUserTemplate.hbs` templates:

- `{{workspaceName}}`: The name of the store
- `{{inviteUrl}}`: The URL where the user can accept the invitation
- `{{oneTimePassword}}`: The one-time password that the user can use to accept the invitation (only available in the `inviteNewUserTemplate.hbs` template)

An example of the `inviteExistingUserTemplate.hbs` template:

```html
<html>
  <head>
    <title>Invite</title>
  </head>
  <body>
    <p>Welcome to Goodtok</p>
    <p>To accept the invitation, please click the following link:
      <a href="{{inviteUrl}}">{{inviteUrl}}</a>
    </p>
  </body>
</html>
```

An example of the `inviteNewUserTemplate.hbs` template:

```html
<html>
  <head>
    <title>Invite</title>
  </head>
  <body>
    <p>Welcome to Goodtok</p>
    <p>Your one-time password is: <b>{{oneTimePassword}}</b></p>
    <p>You can use it at the following URL:
      <a href="{{inviteUrl}}">{{inviteUrl}}</a></p>
  </body>
</html>
```