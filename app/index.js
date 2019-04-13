const express = require('express')
const Blockchain = require('../blockchain')

const HTTP_PORT = process.env.HTTP_PORT || 3001 // biar bisa manggil banyak port

const app = express()
const bc = new Blockchain()

app.get('/blocks', (req,res) => {
  res.json(bc.chain)
})

app.listen(HTTP_PORT, () => console.log(`jalan di http://localhost:${HTTP_PORT}`))