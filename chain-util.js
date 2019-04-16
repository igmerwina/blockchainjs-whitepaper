// berisi file untuk generate wallet key, unique hasesh etc

const EC = require('elliptic').ec // import lib elictip curve algo  
const uuidV1 = require('uuid/v1')
const ec = new EC('secp256k1') // implementasi jenis algo elictip pada bitcoin

 
class ChainUtil{
    static genKeyPair(){
        return ec.genKeyPair()
    }

    static id(){
        return uuidV1()
    }
}


module.exports = ChainUtil