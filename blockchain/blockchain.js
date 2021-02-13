const Block = require('./block');

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()]; //inicializamos la blockchain con el bloque genesis
    }

    addBlock(data) {
        const block = Block.createBlock(this.chain[this.chain.length - 1], data)
        this.chain.push(block)
        return block
    }

    static isValidChain(chain) { //iteramos sobre la cadena y comprobamos que cada bloque está bien "enganchado" con el anterior
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
            return false;

        for (let i = 1; i < chain.length; i++) {
            const block = chain[i];
            const lastBlock = chain[i - 1];
            if ((block.lastHash !== lastBlock.hash) || (
                block.hash !== Block.blockHash(block)))
                return false;
        }

        return true;
    }

    replaceChain(newChain) { // si recibimos una cadena válida y más larga que la nuestra la sustituimos por esa
        if (newChain.length <= this.chain.length) {
            console.log("Received chain is not longer than the current chain");
            return;
        } else if (!this.isValidChain(newChain)) {
            console.log("Received chain is invalid");
            return;
        }

        console.log("Replacing the current chain with new chain");
        this.chain = newChain;
    }
}

module.exports = Blockchain;