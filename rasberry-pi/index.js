const io = require('socket.io')(5050)
const sensorObj = require('jsupm_max30100')

// Instantiate a MAX30100 instance using bus 0
const sensor = new sensorObj.MAX30100(0)

console.log('Oximeter sensor example...')
console.log('Temperature: %d C', sensor.temperature())

console.log('Version: 0x%s', sensor.version().toString(16))

setInterval(() => {
  socket.emit('temp', { temp: sensor.temperature() })
}, 1000)

io.on('connection', socket => {
  for (let i = 0; i < 10; i++) {
    const val = sensor.sample()

    console.log('Single value IR: %d R: %d ', val.IR, val.R)
    socket.emit('pulse', { IR: val.IR, R: val.R })
  }
})

// exit on ^C
process.on('SIGINT', function() {
  sensor = null
  sensorObj.cleanUp()
  sensorObj = null
  console.log('Exiting.')
  process.exit(0)
})
