const io = require('socket.io')(5050)

// const sendPusle = async () => {
//   for (let i = 0; i < 10; i++) {
//     console.log('Single value IR: %d R: %d ', { IR: i, R: -1 })
//     io.emit('pulse', { IR: i, R: -1 })
//   }
// }

// sendPusle()

io.on('connection', socket => {
  for (let i = 0; i < 10; i++) {
    console.log('Single value IR: %d R: %d ', { IR: i, R: -1 })
    socket.emit('pulse', { IR: i, R: -1 })
  }
})
