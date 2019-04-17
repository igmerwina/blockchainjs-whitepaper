//  check if the transaction creation or updated masuk ke transaction Pool 

const Wallet = require('./index')
const TransactionPool = require('./transaction-pool')
const Blockchain = require('../blockchain')

describe('Wallet', () => {
    let wallet, tp, bc

    beforeEach(() => {
        wallet = new Wallet()
        tp = new TransactionPool()
        bc = new Blockchain()
    })

    // assume wallet is creating a transaction
    describe('creating a transaction', () => {
        let transaction, sendAmount, recipient

        beforeEach(() => {
            sendAmount = 50
            recipient = 'r4nd0m-4dsr3ss'
            transaction = wallet.createTransaction(recipient, sendAmount, bc, tp)
        })

        describe('and doing the same transaction', () => {
            beforeEach(() => {
                wallet.createTransaction(recipient, sendAmount, bc, tp)
            })

            // bukti kalau transaksi yang sama dilakuin 2 kali
            it('doubles the `sendAmount` substracted from the wallet balance', () => {
                expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
                    .toEqual(wallet.balance - sendAmount * 2) 
            })

            // clone the send amount. Karna transaksinya sama
            it('clones the `sendAmount` output for the recipient', () => {
                expect(transaction.outputs.filter(output => output.address === recipient)
                    .map(output => output.amount)).toEqual([sendAmount, sendAmount])
            })
        })
    })
})