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

Goodtok helps businesses enhance their customer service right from their website. The video application lets customers connect with your staff in real time. You can integrate this simple and easy-to-use application into any website.

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

First, create a new directory called `goodtok` and change to that directory:

```bash
mkdir goodtok
cd goodtok
```

Run the following command inside the directory to generate a set of security keys. These keys will be used to sign and verify the JWT tokens.

```bash
mkdir -p .keys
openssl genpkey -algorithm RSA -out ./.keys/private.key -pkeyopt rsa_keygen_bits:4096
openssl rsa -in ./.keys/private.key -pubout -out ./.keys/public.key
```

Then, create a `.env` file with the following content:

```bash
# General config
DOCKER_HOST_ADDRESS=${YOUR DOCKER HOST IP}
SIP_DOMAIN=sip.local
SIP_SIGNALING_SERVER=ws://${YOUR DOCKER HOST IP}:5062
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/goodtok
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

# SMTP config
SMTP_HOST=smtp.example.com
SMTP_AUTH_USER=postmaster@example
SMTP_AUTH_PASS=secret
```

Next, run the following command to start the application:

```bash
curl -o ./compose.yaml https://raw.githubusercontent.com/fonoster/goodtok/main/compose.yaml
docker compose up -d
```

Finally, prepare the database with the following command:

```bash
curl -o ./schema.prisma https://raw.githubusercontent.com/fonoster/goodtok/main/mods/apiserver/schema.prisma
npx prisma migrate deploy --schema=./schema.prisma
rm ./schema.prisma
```

The previous command will start all the services, including the front office. You can then access the application at [http://localhost:8080](http://localhost:8080) and access the dashboard.

## Usage

In the website where you want to integrate Goodtok, you will need to add the following script tag:

```html
<!-- Goodtok video client -->
<script
  type="text/javascript"
  src="https://unpkg.com/@goodtok/widget?key=eyJndGlkIjoiZy00ZjkwZDEzYTQyIiwic2VydmVyIjoiaHR0cHM6Ly9hcGkuZ29vZHRvay5pby92MSJ9&token=OPTIONAL_CUSTOMER_TOKEN"
>
</script>
<!-- Goodtok video client end -->
```

The key is a base64 encoded value containing the account `gtid` and `server` of your Goodtok instance. You can generate this value by running the following command:

```bash
# The gtid corresponds to the workspace id in the Goodtok dashboard
echo -n '{"gtid":"g-4f90d13a42","server":"https://api.example.com/v1"}' | base64
```

If no server is specified, the client will use the default server at `api.goodtok.io`.

The video widget will request an anonymous token from the server if none is provided. The server will generate a token only if the owner of the `gtid` has enabled anonymous access. The server will return an error if the owner has not allowed anonymous access.

> Remember that enabling anonymity will require you to implement security measures to prevent abuse ⚠️

A Goodtok token is a [JSON Web Token](https://jwt.io/). Here is an example of the claims for a customer token:

```json
{
  "ref": "customer-agent",
  "domainRef": "default",
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

- When running Goodtok without a TLS certificate, you must add the following to your browser to allow the camera to work: `chrome://flags/#unsafely-treat-insecure-origin-as-secure` or equivalent for your browser, because the camera will not work on an insecure origin.

## Authors

- [Pedro Sanders](https://github.com/fonoster)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
