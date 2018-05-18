'use strict';

const SH256 = require("crypto-js/sha256");
class Block {
    constructor( timestamp, transactions, previousHash = '' ) {
        this.previousHash = previousHash;
        this.data = transactions;
        this.timestamp = timestamp;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256( this.previousHash +
                    this.timestamp +
                    JSON.stringify(this.transactions) +
                    this.nonce
                ).toString()
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("BLOCK MINED: " + this.hash);
    }
}


class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;

        // 在区块产生之间存储交易的地方
        this.pendingTransactions = [];

        // 挖矿回报
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2017", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    createTransaction(transaction) {
        // 这里应该有一些校验!
        if(!transaction){
            return
        }
        // 推入待处理交易数组
        this.pendingTransactions.push(transaction);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

    // 挖矿方法
    minePendingTransactions(miningRewardAddress) {
        // 用所有待交易来创建新的区块并且开挖..
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        // 将新挖的看矿加入到链上
        this.chain.push(block);

        // 重置待处理交易列表并且发送奖励
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }


    // 检查地址的余额
    getBalanceOfAddress(address){
        let balance = 0; // you start at zero!

        // 遍历每个区块以及每个区块内的交易
        for(const block of this.chain){
            for(const trans of block.transactions){

                // 如果地址是发起方 -> 减少余额
                if(trans.fromAddress === address){
                balance -= trans.amount;
                }

                // 如果地址是接收方 -> 增加余额
                if(trans.toAddress === address){
                balance += trans.amount;
                }
            }
        }

        return balance;
    }
}

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}



let savjeeCoin = new Blockchain();

console.log('Creating some transactions...');
savjeeCoin.createTransaction(new Transaction('address1', 'address2', 100));
savjeeCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('Starting the miner...');
savjeeCoin.minePendingTransactions('xaviers-address');


console.log('Balance of Xaviers address is', savjeeCoin.getBalanceOfAddress('xaviers-address'));
// 输出: 0


console.log('Starting the miner again!');
savjeeCoin.minePendingTransactions("xaviers-address");

console.log('Balance of Xaviers address is', savjeeCoin.getBalanceOfAddress('xaviers-address'));
// 输出: 100