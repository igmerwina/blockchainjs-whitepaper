// this file make sure the blockchain app can open up ws server

const ws = require('ws') //import websocket

const P2P_PORT = process.env.P2P_PORT || 5001
const peers = process.env.PEERS ? process.env.PEERS.split(',') : []
const MESSAGE_TYPES = { 
  chain: 'CHAIN',
  transaction: 'TRANSACTION'
}

class p2pServer {
  constructor(blockchain, transactionPool){
    this.blockchain = blockchain
    this.transactionPool = transactionPool
    this.sockets = []
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
    this.sockets.push(socket)
    console.log('Socket connected')

    this.messageHandler(socket)

    this.sendChain(socket)
  }

  // handling message 
  messageHandler(socket){
    socket.on('message', message => {
      const msg_data = JSON.parse(message)
      // console.log('data: ', msg_data)

      this.blockchain.replaceChain(msg_data)
    })
  }

  sendChain(socket){
    socket.send(JSON.stringify({ 
      type: MESSAGE_TYPES.chain,
      chain: this.blockchain.chain 
    }))
  }

  sendTransaction(socket, transaction){
    socket.send(JSON.stringify({
      type: MESSAGE_TYPES.transaction,
      transaction
    }))  
  }

  syncChains(){
    this.sockets.forEach(socket => this.sendChain(socket))
  }

  broadcastTransaction(transaction){
    this.sockets.forEach(socket => this.sendTransaction(socket))
  }
}

 
module.exports = p2pServer