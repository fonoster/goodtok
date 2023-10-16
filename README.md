# Goodtok

<div align="center">
  <p align="center">
    <a href="https://goodtok.com" target="_blank" rel="noopener">
      <img src="https://github.com/fonoster/goodtok/blob/main/assets/repo-banner.png" />
    </a>
  </p>
</div>

<a href="https://gitpod.io/#https://github.com/fonoster/goodtok"> <img src="https://img.shields.io/badge/Contribute%20with-Gitpod-908a85?logo=gitpod" alt="Contribute with Gitpod" />
</a> [![Sponsor this](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&link=https://github.com/sponsors/fonoster)](https://github.com/sponsors/fonoster) [![Discord](https://img.shields.io/discord/1016419835455996076?color=5865F2&label=Discord&logo=discord&logoColor=white)](https://discord.gg/4QWgSz4hTC) ![GitHub](https://img.shields.io/github/license/fonoster/goodtok?color=%2347b96d) ![Twitter Follow](https://img.shields.io/twitter/follow/fonoster?style=social)

Goodtok helps businesses enhance their customer service right from their website. The video application lets customers connect with your staff in real-time. You can integrate this simple and easy-to-use application into any website.

> This project is just starting and is not ready for production use yet 🚧

## Table of Contents

- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Bugs and Feature Requests](#bugs-and-feature-requests)
- [Contributing](#contributing)
- [Questions](#questions)
- [Authors](#authors)
- [License](#license)

## Architecture

Coming soon.

## Give a star! ⭐

It would mean a lot to me if you could give this project a star. It helps me identify if I'm doing a good job or not. Also, it helps me attract potential contributors and users. 🙏

## Installation

We are aiming to make this as easy as possible to install. For now, you can use the following instructions to get started.

Firts, create a new directory called `goodtok` with a `compose.yml` file with the following content:

```yaml
version: "3"

services:

  frontoffice:
    image: fonoster/goodtok-frontoffice:latest
    environment:
      - LOGS_LEVEL
    ports:
      - 8080:8080

  apiserver:
    image: fonoster/goodtok-apiserver:latest
    ports:
      - 6789:6789
    environment:
      - LOGS_LEVEL
      - NATS_URL
      - GOODTOK_SIGNALING_SERVER
      - GOODTOK_DOMAIN
      - DATABASE_URL
    volumes:
      - ./.keys:/keys

  routr:
    image: fonoster/routr-one:latest
    ports:
      - 5062:5062
      - 5063:5063
    environment:
      - LOGS_LEVEL
      - EXTERNAL_ADDRS
      - CONNECT_VERIFIER_PUBLIC_KEY_PATH
      - NATS_PUBLISHER_ENABLED
      - NATS_PUBLISHER_URL
    volumes:
      - ./.keys:/keys
      - routr_db:/var/lib/postgresql/data

  nats:
    image: nats:latest
    expose:
      - 4222

  postgres:
    image: postgres:14.1-alpine
    restart: always
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      TZ: UTC
      PGTZ: UTC
    # WARNING: Once you initialize the database, you should remove the following line
    ports:
      - 5432:5432
    expose:
      - 5432
    volumes:
      - goodtok_db:/var/lib/postgresql/data

volumes:
  routr_db:
  goodtok_db:
```

In the same directory, run the following command to generate a set of keys. These keys will be used to sign and verify the JWT tokens.

```bash
mkdir -p .keys
openssl genpkey -algorithm RSA -out ./.keys/private.key -pkeyopt rsa_keygen_bits:4096
openssl rsa -in ./.keys/private.key -pubout -out ./.keys/public.key
```

Next we need to prepare the database with the following command:

```bash
curl -o ./schema.prisma https://raw.githubusercontent.com/fonoster/goodtok/main/mods/apiserver/schema.prisma
npx prisma migrate deploy --schema=./schema.prisma
rm ./schema.prisma
```

Then, create a `.env` file with the following content:

```bash
EXTERNAL_ADDRS=${YOUR DOCKER HOST IP}
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/goodtok
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
NATS_URL=nats:4222
NATS_PUBLISHER_URL=nats:4222
NATS_PUBLISHER_ENABLED=true
CONNECT_VERIFIER_PUBLIC_KEY_PATH=/keys/public.key
GOODTOK_DOMAIN=sip.local
GOODTOK_SIGNALING_SERVER=ws://${YOUR DOCKER HOST IP}:5062
```

Finally, run the following command to start the application:

```bash
docker compose up -d
```

The previous command will start the front-office application. You will then be able to access the application at http://localhost:8080 and start sending requests from the client application.

## Usage

In the website where you want to integrate Goodtok, you will need to add the following script tag:

```html
<!-- Goodtok video client -->
<script
  type="text/javascript"
  src="https://unpkg.com/goodtok?key=Z3RpZD0xMjM0LHNlcnZlcj1hcGkuZ29vZHRvay5pbyxjdXN0b21lcj10b2tlbg==&token=OPTIONAL_CUSTOMER_TOKEN"
>
</script>
<!-- Goodtok video client end -->
```

The key is a base64 encoded value containing the account `id` and `server` of your Goodtok instance. You can generate this value by running the following command:

```bash
echo -n '{"id":"1234","server":"api.yourinstance.com"}' | base64
```

The client will use the default server at `api.goodtok.io` if no server is specified.

The video widget will request an anonymous token from the server if non is provided. The server will generate a token only if the owner of the `id` has enabled anonymous access. The server will return an error if the owner has not allowed anonymous access.

> Remember that enabling anonymous will require you to implement security measures to prevent abuse ⚠️

A Goodtok token is a [JSON Web Token](https://jwt.io/). Here is an example of the claims for a customer token:

```json
{
  "ref": "customer-agent",
  "domainRef": "goodtok-01",
  "aor": "sip:anonymous@sip.goodtok.io",
  "aorLink": "sip:anonymous@sip.goodtok.io",
  "domain": "sip.goodtok.io",
  "privacy": "PRIVATE",
  "allowedMethods": ["REGISTER"],
  "signalingServer": "wss://sip.goodtok.io:5062",
}
```

> The Front Office application will look similar but has different allowed methods.

## Bugs and Feature Requests

For bugs or feature requests, please create an issue [here](https://github.com/fonoster/goodtok/issues). For questions, please see the [Discussions](https://github.com/fonoster/goodtok/discussions) section.

## Contributing

If you want to contribute to this project, please read the [CONTRIBUTING.md](CONTRIBUTING.md) file.

(I am still working on this section; please come soon.)

## Questions

If you have any questions about this project, please look at the [organization's profile](https://github.com/fonoster) to find the most up-to-date contact information for us.

## Known Issues

- When running Goodtok without a TLS certificate, you will need to add the following to your browser to allow the camera to work: `chrome://flags/#unsafely-treat-insecure-origin-as-secure` or equivalent for your browser. This is because the camera will not work on an insecure origin.

## Authors

- [Pedro Sanders](https://github.com/fonoster)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
