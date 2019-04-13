// this file make sure the blockchain app can open up ws server

const ws = require('ws') //import websocket

const P2P_PORT = process.env.P2P_PORT || 5001
const peers = process.env.PEERS ? process.env.PEERS.split(',') : []

class p2pServer(){
  constructor(blockchain){
    this.blockchain = blockchain
    this.socket = []
  }

  listen(){
    const server = new ws.Server({ port: P2P_PORT })
    server.on('connection', socket => this.connectSocket(socket))
    console.log(`Listening for peer-to-peer conn on ${P2P_PORT}`)
  }

  connectSocket(socket){
    this.socket.push(socket)
    console.log('Socket connected')
  }
}
