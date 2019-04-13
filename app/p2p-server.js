// this file make sure the blockchain app can open up ws server

const ws = require('ws') //import websocket

const P2P_PORT = process.env.P2P_PORT || 5001
const peers = process.env.PEERS ? process.env.PEERS.split(',') : []

class p2pServer {
  constructor(blockchain){
    this.blockchain = blockchain
    this.socket = []
  }

  listen(){
    const server = new ws.Server({ port: P2P_PORT })
    server.on('connection', socket => this.connectSocket(socket))
    
    this.connectToPeers()

    console.log(`Listening for peer-to-peer conn on http://localhost/${P2P_PORT}`)
  }


  connectToPeers(){
    peers.forEach(peer => {
      const socket = new ws(peer)

      socket.on('open', () => this.connectSocket(socket))
    })
  }


  connectSocket(socket){
    this.socket.push(socket)
    console.log('Socket connected')

    this.messageHandler(socket)

    socket.send(JSON.stringify(this.blockchain.chain))
  }

  // handling message 
  messageHandler(socket){
    socket.on('message', message => {
      const msg_data = JSON.parse(message)
      console.log('data: ', msg_data)
    })
  }
}

 
module.exports = p2pServer