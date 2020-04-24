# node-mailer
API para envio de emails.

.env example:
NODE_ENV=production
PORT=3000

targets.json example:
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
