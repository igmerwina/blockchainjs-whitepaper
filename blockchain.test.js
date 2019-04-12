// blockchain.test.js
// auto unit test with jest 

const Block = require('./block')
const Blockchain = require('./blockchain')

describe('Blockchain', () => {
    let bc 

    beforeEach(() => {
        bc = new Blockchain ()
    })
    
    // testing block awal di bc = genesis block
    it('start with genesis block', () => {
        expect(bc.chain[0]).toEqual(Block.genesis())
    })

    // add new block di bc = data di add block
    it('add a new Block', () => {
        const data = 'foo'
        bc.addBlock(data)

        expect(bc.chain[bc.chain.length-1].data).toEqual(data)
    })
})