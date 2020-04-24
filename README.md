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
      "target": "yourTarget",
      "name": "Your Site",
      "to": "email@email.com.br, email2@email.com.br",
      "host": "",
      "port": 0,
      "secure": false,
      "user": "user@yourdomain.com",
      "pass": ""
    }
  ]
}

```
