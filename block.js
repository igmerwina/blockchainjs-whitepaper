// block.js

class Block {
    constructor(timestamp, lastHash, hash, data){
        this.timestamp = timestamp
        this.lastHash = lastHash
        this.hash = hash
        this.data = data
    }

    toString(){
        return `Block - 
            Timestamp: ${this.timestamp}
            Last Hash: ${this.lastHash.substring(0, 10) + '...'}
            Hash     : ${this.hash.substring(0, 10) + '...'}
            Data     : ${this.data}
        `
    }

    // genesis block
    static genesis(){
        return new this(
            'Genesis Timestamp', 
            '-----', 
            '5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9', 
            []
        )
    }
}


module.exports = Block