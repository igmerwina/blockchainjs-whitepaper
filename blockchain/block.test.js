// auto unit test with jest 

const Block = require('./block')
const { DIFFICULTY } = require('../config')

// testing Block
describe('Block', () => {
    // deklarasi variable biar bisa dipake di it
    let data, lastBlock, block 
    
    beforeEach(() => {
        data = 'bar'
        lastBlock = Block.genesis()
        block = Block.mineBlock(lastBlock, data)
    })

    // keren, tapi butuh mahamin fungsi it di jest
    it('sets the `data` to the match input', () => {
        expect(block.data).toEqual(data)
    })

    it('sets the `lastHash` to match the hash of the last block input', () => {
        expect(block.lastHash).toEqual(lastBlock.hash)        
    })

    // testing nonce hash
    it('generate the hash that matches the difficulty', () => {
        expect(block.hash.substring(0, DIFFICULTY)).toEqual('0'.repeat(DIFFICULTY))        
        console.log(block.toString())
    })
})