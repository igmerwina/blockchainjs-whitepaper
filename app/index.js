const express = require('express')
const bp = require('body-parser')
const Blockchain = require('../blockchain')
const p2pServer = require('./p2p-server') 

const HTTP_PORT = process.env.HTTP_PORT || 3001 // biar bisa manggil banyak port

const app = express()
const bc = new Blockchain()
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

app.listen(HTTP_PORT, () => console.log(`jalan di http://localhost:${HTTP_PORT}`))
p2p.listen()