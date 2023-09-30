# GoodTok

<div align="center">
  <p align="center">
    <a href="https://routr.io" target="_blank" rel="noopener">
      <img src="https://github.com/psanders/goodtok/blob/main/assets/repo-banner.png" />
    </a>
  </p>
</div>

<a href="https://gitpod.io/#https://github.com/psanders/goodtok"> <img src="https://img.shields.io/badge/Contribute%20with-Gitpod-908a85?logo=gitpod" alt="Contribute with Gitpod" />
</a> [![Sponsor this](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&link=https://github.com/sponsors/psanders)](https://github.com/sponsors/psanders) [![Discord](https://img.shields.io/discord/1016419835455996076?color=5865F2&label=Discord&logo=discord&logoColor=white)](https://discord.gg/4QWgSz4hTC) ![GitHub](https://img.shields.io/github/license/psanders/goodtok?color=%2347b96d) ![Twitter Follow](https://img.shields.io/twitter/follow/pedrosanders_?style=social)

GoodTok helps businesses enhance their customer service right from their website. The video application lets customers connect with your staff in real-time. You can integrate this simple and easy-to-use application into any website.

> This project is just starting and is not ready for production use yet.

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

I would mean a lot to me if you could give this project a star. It helps me identify if I'm doing a good job or not. Also, it helps me attract potential contributors and users. 🙏

# Installation

I'm aiming to make this as easy as possible to install. I'm working on a docker image allowing you to run this application with a single command. When it is ready, you will be able to run the following command to get started:

```bash
docker compose up -d
```

The previous command will start the front-office application. You will then be able to access the application at http://localhost:3000 and start sending requests from the client application.

In the website where you want to integrate GoodTok, you will need to add the following script tag:

```html
  <!-- GoodTok video client -->
  <script
    id="goodtok-script"
    type="text/javascript"
    src="https://goodtok.com/assistant/web.js?key=1413d7-031-13bWa28"
  >
  </script>
  <!-- GoodTok video client end -->
```

## Usage

I'm still refining the usage of this application. But the core flow will be as follows:

1. A customer visits your website and clicks on the GoodTok widget
2. The customer is prompted to enter their name and email address
3. If the customer is "logged in," they get to skip the previous step
4. The user gets placed in a queue and waits for an agent to become available
5. When an agent becomes available, the customer is notified, and the video chat starts

## Bugs and Feature Requests

For bugs or feature requests, please create an issue [here](https://github.com/psanders/goodtok/issues). For questions, please see the [Discussions](https://github.com/psanders/goodtok/issues) section.

## Contributing

If you want to contribute to this project, please read the [CONTRIBUTING.md](CONTRIBUTING.md) file.

(I am still working on this section; please come soon.)

## Questions

If you have any questions about this project, please look at my [GitHub profile](https://github.com/psanders) to find the most up-to-date contact information for me.

## Authors

- [Pedro Sanders](https://github.com/psanders)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
