// test the transaction 

const Transaction =  require('./transaction')
const Wallet = require('./index')

describe('Transaction', () =>{
    let transaction, wallet, recipient, amount

    // create relevant value before test func.
    beforeEach(() => {
        wallet = new Wallet()
        amount = 50
        recipient = 'r3c1p1i3nt'    

        transaction = Transaction.newTransaction(wallet, recipient,amount)
    })
    
    // test #1
    // check kalau output = balance - transaksi
    it('outputs the `amount` subtracted from the wallet balance', () => {
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
            .toEqual(wallet.balance - amount)
    })

    // test #2 
    // check kalau amount diterima recipient 
    it('outputs the `amount` added to recipient', () => {
        expect(transaction.outputs.find(output => output.address === recipient).amount)
            .toEqual(amount)
    })

    // test #3 inputs the balance of the wallet
    it('inputs the balance of the wallet', () => {
        expect(transaction.input.amount).toEqual(wallet.balance)
    })

    // ---- beda kondisi: kondisi kalau amount tx > wallet balance
    describe('transacting with an amount that exceed the balance', () => {
        beforeEach(() => {
            amount = 50000
            transaction = Transaction.newTransaction(wallet, recipient, amount)
        })


        // test: hasilnya undefined karna balance kurang
        it('does not create transaction', () => {
            expect(transaction).toEqual(undefined)
        })
    })
    
})