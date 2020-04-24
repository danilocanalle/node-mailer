# node-mailer
API para envio de emails.


Utiliza express-brute com Redis em produção e um default em desenvolvimento.

pm2 start npm --name node-mailer -- run api

### .env example:
```
NODE_ENV=development
PORT=3000
```

### targets.json example:
```
{
  "targets": [
    {
      "name": "yourTarget",
      "host": "",
      "port": 587,
      "secure": false,
      "user": "",
      "pass": ""
    }
  ]
}
```
