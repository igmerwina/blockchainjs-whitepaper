// test the transaction pool 

const TransactionPool = require('./transaction-pool')
const Transaction = require('./transaction')
const Wallet = require('./index')

describe('TransactionPool', () => {
    let tp, wallet, transaction
    
    // set the variable with something
    beforeEach(() => {
        tp = new TransactionPool()
        wallet = new Wallet()
        transaction = Transaction.newTransaction(wallet, 'r4nd0m-4ddr355', 30)
        tp.updateOrAddTransaction(transaction)
    })

    // test #1: add transaction to the pool
    it('adds transaction to the transaction pool', () => {
        expect(tp.transactions.find(t => t.id === transaction.id)).toEqual(transaction)
    })

    // test #2: updates transaction in the pool
    it('updates transaction in the pool', () => {
        // buat data transaksi yg uda ada dalam format json
        const oldTransaction = JSON.stringify(transaction)
        // buat transaksi baru 
        const newTransaction = transaction.update(wallet, 'f00-4ddr355', 40)
        tp.updateOrAddTransaction(newTransaction)

        expect(JSON.stringify(tp.transactions.find(t => t.id === newTransaction.id)))
            .not.toEqual(oldTransaction)
    })
})