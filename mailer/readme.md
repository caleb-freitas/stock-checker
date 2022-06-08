# Mailer Service

## Running the service

- Add SendGrid credentials on [.example.env](./.example.env) and rename it to `.env`. You can get your api key [here](https://sendgrid.com/) and use it as `MAILER_PASSWORD` variable

- Run `docker-compose up` to start the mailer service

- Wait for the following log messages:

```bash
[Mailer] HTTP server running
[Mailer] microservice running
```
