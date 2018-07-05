const io = require('socket.io')(5050)
const sensorObj = require('jsupm_max30100')

// Instantiate a MAX30100 instance using bus 0
const sensor = new sensorObj.MAX30100(0)

console.log('Oximeter sensor example...')
console.log('Temperature: %d C', sensor.temperature())

console.log('Version: 0x%s', sensor.version().toString(16))

sensor.high_res_enable(true)

// Set to sample HR
sensor.mode(sensorObj.MAX30100_MODE_HR_EN)

io.on('connection', socket => {
  setInterval(() => {
    socket.emit('temp', { temp: sensor.temperature() })
    const val = sensor.sample()
    socket.emit('pulse', { IR: val.IR, R: val.R })
  }, 300)
})

// exit on ^C
process.on('SIGINT', function() {
  sensor = null
  sensorObj.cleanUp()
  sensorObj = null
  console.log('Exiting.')
  process.exit(0)
})
