class Miner {
    constructor(blockchain, transactionPool, wallet, p2pServer){
        this.blockchain = blockchain
        this.transactionPool = transactionPool
        this.wallet = wallet
        this.p2pServer = p2pServer
    }

    mine(){
        const validTransaction = this.transactionPool.validTransactions(){
        // include reward for the miner
        // create a block consisting of valid transactions
        // sync the chain in p2p
        // clear transaction pool
        // broadcast to every miner to clear their transaction pools
        }
    }
}

module.exports = Miner