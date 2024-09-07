# Goodtok

<div align="center">
  <p align="center">
    <a href="https://goodtok.io" target="_blank" rel="noopener">
      <img src="https://github.com/fonoster/goodtok/blob/main/assets/repo-banner.png" />
    </a>
  </p>
</div>

<a href="https://gitpod.io/#https://github.com/fonoster/goodtok"> <img src="https://img.shields.io/badge/Contribute%20with-Gitpod-908a85?logo=gitpod" alt="Contribute with Gitpod" />
</a> [![Sponsor this](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&link=https://github.com/sponsors/fonoster)](https://github.com/sponsors/fonoster) [![Discord](https://img.shields.io/discord/1016419835455996076?color=5865F2&label=Discord&logo=discord&logoColor=white)](https://discord.gg/4QWgSz4hTC) ![GitHub](https://img.shields.io/github/license/fonoster/goodtok?color=%2347b96d) ![Twitter Follow](https://img.shields.io/twitter/follow/fonoster?style=social)

Goodtok helps businesses enhance their customer service right from their website. The video application lets customers connect with your staff in real-time. You can integrate this simple and easy-to-use application into any website.

> This project is just starting and is not ready for production use yet 🚧

## Table of Contents

- [Give a star!](#give-a-star-)
- [Installation](#installation)
- [Development Mode](#development-mode-with-gitpod)
- [Usage](#usage)
- [Architecture](#architecture)
- [Contact us](#contact-us)
- [Bugs and Feature Requests](#bugs-and-feature-requests)
- [Contributing](#contributing)
- [Authors](#authors)
- [License](#license)

## Give a Star! ⭐

It would mean a lot to us if you could give this project a star. It helps us identify if we are doing a good job and attract potential contributors, users, and investors. Thanks 🙏

## Installation

We aim to make this as easy to install as possible. For now, follow the following instructions to get started.

First, create a new directory called `goodtok` and change to that directory:

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
#   The password will be updated if the email exists
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
# Create a new encryption key with cloack (https://cloack.47ng.com)
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/goodtok
CLOAK_ENCRYPTION_KEY=k1.aesgcm256.MmPSvzCG9fk654bAbl30tsqq4h9d3N4F11hlue8bGAY=

# Uncomment to enable custom email templates
#  See mods/apiserver/src/notifications/templates for available templates
#  If not set, Goodtok will use the default templates
# EMAIL_TEMPLATES_DIR=/path/to/email/templates
```

Finally, run the following command to start the application:

```bash
curl -o ./compose.yaml https://raw.githubusercontent.com/fonoster/goodtok/main/compose.yaml
docker compose up -d
```

The previous command will start all the services, including the Front Office. You can then open the application at [http://localhost:8080](http://localhost:8080) and access the dashboard.

## Development mode with Gitpod

Goodtok's one-click interactive deployment will familiarize you with the server in development mode.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/fonoster/goodtok)

## Usage

In the website where you want to integrate Goodtok, you will need to add the following script tag:

```html
<!-- Goodtok video client -->
<script
  type="module"
  src="https://unpkg.com/@goodtok/widget?key=eyJndGlkIjoiZy00ZjkwZDEzYTQyIiwic2VydmVyIjoiaHR0cHM6Ly9hcGkuZ29vZHRvay5pby92MSJ9&token=OPTIONAL_CUSTOMER_TOKEN"
>
</script>
<!-- Goodtok video client end -->
```

The key is a base64 encoded value containing the account `gtid` and `server` of your Goodtok instance. You can generate this value by running the following command:

```bash
# The gtid corresponds to the workspace id in the Goodtok dashboard
echo -n '{"gtid":"g-7b7c46fb05","server":"http://localhost:6789/v1"}' | base64
```

The client will default to `https://api.goodtok.io/v1` if no server is specified.

A customer token is a [JSON Web Token](https://jwt.io/) with necessary claims to authenticate the user and connect to the signaling server. Here is an example of the claims for a customer token:

```json
{
  "ref": "iypok",
  "customerId": "iypok",
  "workspaceId": "g-7b7c46fb05",
  "calendarUrl": "https://cal.com/placeholder",
  "signalingHost": "peerjs.goodtok.io",
  "signalingPort": 443,
  "iceServers": {...}
  "metadata": {
    "name": "Peter",
    "email": "peter@example.com",
    "message": "Test message"
  },
  "iat": 1701740245,
  "exp": 1701826645
}
```

When no customer token is provided, the video widget will show a form requesting the user to enter their name, email, and a message. The video widget will then request an anonymous token from the server. We recommend providing a customer token to the video widget to avoid the form.

To learn more about customer tokens, see the [customer tokens](https://goodtok.io/docs/video-widget/customer-tokens) section in the documentation.

## Architecture

Goodtok uses a combination of open-source tools to provide a video application that can be integrated into any website. If the tool exists and is well maintained, we will use and support it. If the tool doesn't exist, we build and open-source it ourselves.

Goodtok is a [hosted platform](https://goodtok.io). You can sign up and start using Goodtok without installing anything. You can also self-host and develop locally.

<div align="center">
  <p align="center">
    <img src="https://github.com/fonoster/goodtok/blob/main/assets/architecture.png" />
  </p>
</div>

- [Postgres](https://www.postgresql.org/) is a popular open-source database with a proven architecture that has earned it a strong reputation for reliability, data integrity, and correctness.
- [tRPC](https://trpc.io) is a library for building end-to-end type-safe APIs with TypeScript and Node.js. We connect all the services using tRPC.
- [SMTP](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol) is an Internet standard for email transmission. We use SMTP to send emails to customers and agents.
- [PeerJS](https://peerjs.com/) simplifies WebRTC peer-to-peer data, video, and audio calls. We use PeerJS to establish a WebRTC connection between the customer and the agent.

## Contact us

Meet our sales team for any commercial inquiries.

<a href="https://cal.com/psanders"><img src="https://cal.com/book-with-cal-dark.svg" alt="Book us with Cal.com"></a>

## Bugs and Feature Requests

For bugs or feature requests, please create an issue [here](https://github.com/fonoster/goodtok/issues). For questions, please see the [Discussions] section (https://github.com/fonoster/goodtok/discussions).

## Known Issues

When running Goodtok without a TLS certificate, you must add the following to your browser to allow the camera to work: `chrome://flags/#unsafely-treat-insecure-origin-as-secure` or an equivalent for your browser. The camera will not work on an insecure origin.

## Contributing

For contributing, please see the following links:

 - [Contribution Documents](https://github.com/fonoster/goodtok/blob/master/CONTRIBUTING.md)
 - [Contributors](https://github.com/fonoster/goodtok/contributors)

<!--contributors:start-->

<table>
<tr>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/psanders>
            <img src=https://avatars.githubusercontent.com/u/539774?v=4 width="100;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=Pedro Sanders/>
            <br />
            <sub style="font-size:14px"><b>Pedro Sanders</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/obrucheoghene>
            <img src=https://avatars.githubusercontent.com/u/111436934?v=4 width="100;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=Obruche Wilfred  Oghenechohwo/>
            <br />
            <sub style="font-size:14px"><b>Obruche Wilfred  Oghenechohwo</b></sub>
        </a>
    </td>
</tr>
</table>

## Authors

- [Pedro Sanders](https://github.com/fonoster)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
