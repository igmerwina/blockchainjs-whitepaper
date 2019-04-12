const Block = require('./block')

const block = new Block('foo', 'bar', 'zoo', 'baz')
console.log(block.toString())

// Block karena manggil dari class
console.log(Block.genesis().toString())

