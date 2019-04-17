const ChainUtil = require('../chain-util')
const { INITIAL_BALANCE } = require('../config')
const Transaction = require('./transaction')

class Wallet{
    constructor(){
        this.balance = INITIAL_BALANCE
        this.keyPair = ChainUtil.genKeyPair()
        this.publicKey = this.keyPair.getPublic().encode('hex')
    }

    toString(){
        return `wallet - 
            publicKey: ${this.publicKey.toString()}    
            balance  : ${this.balance}    
        `
    }

    // buat signature dari transaksi 
    sign(dataHash){
        return this.keyPair.sign(dataHash)
        
    }

    createTransaction(recipient, amount, transactionPool){
        if (amount > this.balance){
            console.log(`Amount: ${amount} exceed the current balance: ${this.balance}`)
            return
        }

        // check the transaction exist or not 
        let transaction = transactionPool.existingTransaction(this.publicKey)

        if (transaction){
            // update if exist
            transaction.update(this, recipient, amount)
        } else {
            // create new one if not exist
            transaction = Transaction.newTransaction(this, recipient, amount)
            transactionPool.updateOrAddTransaction(transaction)
        }

        return transaction
    }

    static blockchainWallet(){
        const blockchainWallet = new this()
        blockchainWallet.address = 'blockchain-wallet'
        return blockchainWallet
    }
}

module.exports = Wallet