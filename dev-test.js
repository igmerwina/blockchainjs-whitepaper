// file untuk nguji aplikasi secara keseluruhan
// dilakukan setelah unit test 

const Blockchain = require('./blockchain')

const bc = new Blockchain()

for(let i=0; i<10; i++){
  console.log(bc.addBlock(`foo ${i}`).toString())
}

console.log("test pass")