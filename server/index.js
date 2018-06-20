const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json())
app.use(cors())

app.get('/google-login', (req, res, next) => {
  console.log('hit')
  fetch(`GET https://myservice.example.com/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=STATE_STRING&scope=REQUESTED_SCOPES&response_type=code
`)
  res.status(200).send({"status": "working"})
})

app.listen(port, () => console.log(`listening on ${port}`))
