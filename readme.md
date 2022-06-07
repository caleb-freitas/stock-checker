# Stock Checker

Application created to check if a stock has reached a target price and when this event is true, it performs an asynchronous communication via messenger using kafka to trigger the mailer service to send an email to the customer notifying that the target price has been reached

## Running the application

1. Start Apache Kafka service. [See instructions](./kafka/readme.md)
2. Start Checker service. [See instructions](./checker/readme.md)
3. Start Mailer service. [See instructions](./mailer/readme.md)

## Using the application

- Send a `POST` request to `http://localhost:8001/check` with the following body:

```json
{
	"email": "your_email@domain",
	"stock": "stock_symbol",
	"targetPrice": 145
}
```

- Put your real email

- Choose your stock symbol. The complete list can be found [here](https://stockanalysis.com/stocks/)

- Set your target price

### Tips

- If you want to see the communication between the services you can either open your terminal and see the logs of the containers running

```bash
$ docker-compose logs -f checker
$ docker-compose logs -f mailer
```

- Or you can just access `http://localhost:9021` and see the kafka clusters, topics and its messages

- You can put a higher valuer for target price to get the email just for fun (and faster :p)

## Built with

- [TypeScript](https://www.typescriptlang.org/)
- [Nest.js](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Apache Kafka](https://kafka.apache.org/)
- [Docker](https://www.docker.com/)
