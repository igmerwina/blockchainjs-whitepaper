const express = require('express')
const bp = require('body-parser')

const Blockchain = require('../blockchain')
const p2pServer = require('./p2p-server') 
const Wallet = require('../wallet')
const TransactionPool = require('../wallet/transaction-pool')

const HTTP_PORT = process.env.HTTP_PORT || 3001 // biar bisa manggil banyak port

const app = express()
const bc = new Blockchain()
const wallet = new Wallet()
const tp = new TransactionPool()
const p2p = new p2pServer(bc)

app.use(bp.json()) // allow us to receive json on post request

app.get('/blocks', (req,res) => {
  res.json(bc.chain)
})

app.post('/mine', (req, res) => {
  const block = bc.addBlock(req.body.data)
  console.log(`New block added: ${block.toString()}`)

  p2p.syncChains()

  res.redirect('/blocks')
})

// user can interact with transaction pool
app.get('/transactions', (req, res) => {
  res.json(tp.transactions)
})

app.listen(HTTP_PORT, () => console.log(`jalan di http://localhost:${HTTP_PORT}`))
p2p.listen()