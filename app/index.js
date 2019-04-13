const express = require('express')
const bp = require('body-parser')
const Blockchain = require('../blockchain')

const HTTP_PORT = process.env.HTTP_PORT || 3001 // biar bisa manggil banyak port

const app = express()
const bc = new Blockchain()

app.use(bp.json()) // allow us to receive json on post request

app.get('/blocks', (req,res) => {
  res.json(bc.chain)
})

app.post('/mine', (req, res) => {
  const block = bc.addBlock(req.body.data)
  console.log(`New block added: ${block.toString()}`)

  res.redirect('/blocks')
})

app.listen(HTTP_PORT, () => console.log(`jalan di http://localhost:${HTTP_PORT}`))