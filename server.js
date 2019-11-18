const express = require('express')
const app = express()
const http = require('http').Server(app)
const { exec } = require('child_process');

const bodyParser = require('body-parser')

app.use(bodyParser.json())

var state = { link: 'https://dashboard.lognature.com.br' }

exec(`echo ${state.link} > /home/pi/display_link.txt`)
exec('sudo systemctl restart kiosk')

app.get('/status', (req, res) => {
  return res.json(state)
})

app.post('/link', (req, res) => {
  const { link } = req.body

  console.log('NEW LINK: ' + link)

  if (!link)
    return res.sendStatus(400)

  state.link = link

  exec(`echo ${link} > /home/pi/display_link.txt`)
  exec('sudo systemctl restart kiosk')

  return res.sendStatus(200)
})

const port = 5000

http.listen(port, function() {
	console.log('[SERVER] Successfully started! Running on port: ' + port)
})