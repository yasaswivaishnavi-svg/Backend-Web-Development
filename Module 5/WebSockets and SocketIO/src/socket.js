/*'use strict';

const { Server } = require('socket.io');

function initSocket(httpServer) {
  // TODO 1: create a new Socket.IO server bound to httpServer
  //         (pass { cors: { origin: '*' } } as options)
  const io = null;

  if (!io) return io;   // remove this line once TODO 1 creates a real server

  io.on('connection', (socket) => {
    console.log(`[+] connected: ${socket.id}`);

    // TODO 2: listen for 'joinRoom', data: { room }, call socket.join(data.room)

    // TODO 3: listen for 'leaveRoom', data: { room }, call socket.leave(data.room)

    // TODO 4: listen for 'newComment', data: { room, text }, broadcast
    //         'commentAdded' with that data to everyone in data.room
    //         (use io.to(data.room).emit(), not io.emit())

    // TODO 5: listen for 'disconnect', log: [-] disconnected: <socket.id> (<reason>)
  });

  return io;
}

module.exports = { initSocket };
*/

'use strict';

const { Server } = require('socket.io');

function initSocket(httpServer) {
  // TODO 1: Create a Socket.IO server
  const io = new Server(httpServer, {
    cors: {
      origin: '*'
    }
  });

  // Listen for new client connections
  io.on('connection', (socket) => {
    console.log(`[+] connected: ${socket.id}`);

    // TODO 2: Join a room
    socket.on('joinRoom', (data) => {
      socket.join(data.room);
    });

    // TODO 3: Leave a room
    socket.on('leaveRoom', (data) => {
      socket.leave(data.room);
    });

    // TODO 4: Broadcast a new comment to the room
    socket.on('newComment', (data) => {
      io.to(data.room).emit('commentAdded', data);
    });

    // TODO 5: Handle client disconnection
    socket.on('disconnect', (reason) => {
      console.log(`[-] disconnected: ${socket.id} (${reason})`);
    });
  });

  return io;
}

module.exports = { initSocket };
