const sensorObj = require('jsupm_max30100')

// Instantiate a MAX30100 instance using bus 0
const sensor = new sensorObj.MAX30100(0)

console.log('Oximeter sensor example...')

// Read the temperature and version
console.log('Temperature: %d C', sensor.temperature())
console.log('Version: 0x%s', sensor.version().toString(16))

// Set high-res (50 Hz, 16-bit)
sensor.high_res_enable(true)

// Set to sample SpO2
sensor.mode(sensorObj.MAX30100_MODE_SPO2_EN)

// Read individual samples
for (let i = 0; i < 10; i++) {
  const val = sensor.sample()
  console.log('Single value IR: %d R: %d ', val.IR, val.R)
}

// exit on ^C
process.on('SIGINT', function() {
  sensor = null
  sensorObj.cleanUp()
  sensorObj = null
  console.log('Exiting.')
  process.exit(0)
})
