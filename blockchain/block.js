const SHA256 = require('crypto-js/sha256')
const { DIFFICULTY } = require('../config') // mining difficulty, biar gampang proses 2 dlu

class Block {
    constructor(timestamp, lastHash, hash, data, nonce){
        this.timestamp = timestamp
        this.lastHash = lastHash
        this.hash = hash
        this.data = data
        this.nonce = nonce
    }

    toString(){
        return `Block - 
            Timestamp: ${this.timestamp}
            Last Hash: ${this.lastHash.substring(0, 10) + '...'}
            Hash     : ${this.hash.substring(0, 10) + '...'}
            Nonce    : ${this.nonce}
            Data     : ${this.data}
        `
    }

    // genesis block
    static genesis(){
        return new this(
            'Genesis Timestamp', 
            '-----', 
            '5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9',
            [],
            '0'
        )
    }

    // mine block
    static mineBlock(lastBlock,data){
        let hash, timestamp
        const lastHash = lastBlock.hash
        let nonce = 0

        do {
            nonce++
            timestamp = Date.now()
            hash = Block.hash(timestamp, lastHash, data, nonce)   
        } while(hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY)) // untuk set difficulty 

        return new this(timestamp, lastHash, hash, data, nonce)
    }


    // hash with SHA256
    static hash(timestamp, lastHash, data, nonce){
        return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString()

    }

    // static blockHash 
    static blockHash(block){
        const { timestamp, lastHash, data, nonce } = block
        return Block.hash(timestamp, lastHash, data, nonce)
    }
}


module.exports = Block