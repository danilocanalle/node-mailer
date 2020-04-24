# node-mailer
API para envio de emails.

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
