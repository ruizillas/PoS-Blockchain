const Block = require('./block');

class Blockchain{
    constructor(){
        this.chain = [Block.genesis()]; //inicializamos la blockchain con el bloque genesis
    }

    addBlock(data){
        const block =Block.createBlock(this.chain[this.chain.length-1],data)
        this.chain.push(block)
        return block
    }
}

module.exports = Blockchain;