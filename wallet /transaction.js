// logika proses transaksi ada di sini
// kaya transfer uang, dsb 

const ChainUtil = require('../chain-util')

class Transaction{
    constructor(){
        this.id = ChainUtil.id()
        this.input = null 
        this.outputs = []
    }

    static newTransaction(senderWallet, recipient, amount){
        const transaction = new this()
        
        // check the balance di wallet bisa gak dipake buat transaksi
        if(amount > senderWallet.balance){
            console.log(`Amount: ${amount} exceeds balance`) // print ke terminal
            return
        }
        // outputs yang dicatet dari proses transaksi: 
        transaction.outputs.push(...[
            { 
                amount: senderWallet.balance - amount,
                address: senderWallet.publicKey
            }, 
            {
                amount, address: recipient
            }
        ])

        return transaction
    }
}


module.exports = Transaction
