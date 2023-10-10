# Goodtok

<div align="center">
  <p align="center">
    <a href="https://goodtok.com" target="_blank" rel="noopener">
      <img src="https://github.com/psanders/goodtok/blob/main/assets/repo-banner.png" />
    </a>
  </p>
</div>

<a href="https://gitpod.io/#https://github.com/psanders/goodtok"> <img src="https://img.shields.io/badge/Contribute%20with-Gitpod-908a85?logo=gitpod" alt="Contribute with Gitpod" />
</a> [![Sponsor this](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&link=https://github.com/sponsors/psanders)](https://github.com/sponsors/psanders) [![Discord](https://img.shields.io/discord/1016419835455996076?color=5865F2&label=Discord&logo=discord&logoColor=white)](https://discord.gg/4QWgSz4hTC) ![GitHub](https://img.shields.io/github/license/psanders/goodtok?color=%2347b96d) ![Twitter Follow](https://img.shields.io/twitter/follow/pedrosanders_?style=social)

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

# Installation

I'm aiming to make this as easy as possible to install. I'm working on a docker image allowing you to run this application with a single command. When it is ready, you will be able to run the following command to get started:

```bash
docker compose up -d
```

The previous command will start the front-office application. You will then be able to access the application at http://localhost:3000 and start sending requests from the client application.

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

For bugs or feature requests, please create an issue [here](https://github.com/psanders/goodtok/issues). For questions, please see the [Discussions](https://github.com/psanders/goodtok/discussions) section.

## Contributing

If you want to contribute to this project, please read the [CONTRIBUTING.md](CONTRIBUTING.md) file.

(I am still working on this section; please come soon.)

## Questions

If you have any questions about this project, please look at my [GitHub profile](https://github.com/psanders) to find the most up-to-date contact information for me.

## Known Issues

- When running Goodtok without a TLS certificate, you will need to add the following to your browser to allow the camera to work: `chrome://flags/#unsafely-treat-insecure-origin-as-secure` or equivalent for your browser. This is because the camera will not work on an insecure origin.

## Authors

- [Pedro Sanders](https://github.com/psanders)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
