class TransactionPool {
    constructor(){
        this.transactions = [] // collection of transaction 
    }

    updateOrAddTransaction(transaction){
        // check transaksi uda ada / terjadi apa belum 
        let transactionWithId = this.transactions.find(t => t.id === transaction.id)

        if (transactionWithId){
            // change the element in array 
            this.transactions[this.transactions.indexOf(transactionWithId)] = transaction 
        } else {
            this.transactions.push(transaction)
        }
    }
    
    existingTransaction(address){
        return this.transactions.find(t => t.input.address === address)
    }
}

module.exports = TransactionPool