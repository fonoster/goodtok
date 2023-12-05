# Installation

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

Were the key is a `base64` encoded value containing the Workspace GTID and server of your Goodtok instance. You can generate this value by running the following command:

Use the following command to generate the key:

```bash
echo -n '{"gtid":"g-7b7c46fb05","server":"http://localhost:6789/v1"}' | base64
```

The `gtid` property corresponds to the Workspace id in the Goodtok dashboard.

If no server is specified, the client will default to `https://api.goodtok.io/v1.`

When no Customer token is provided, the video widget will show a form, requesting the user to enter their name, email and a message. The video widget will then request an anonymous token from the server. When possible we recommend you to provide a Customer token to the video widget to avoid the form.

To learn more about Customer tokens, see the [Customer tokens](#customer-tokens) section.