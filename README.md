# 旨在区块链开发的知识储备

### 一个用js依赖哈希实现的简单的区块链
[项目地址](https://github.com/SavjeeTutorials/SavjeeCoin)

```
part1：实现一个基本的区块链
part2：实现POW
part3：交易与挖矿奖励
```

#### 以太坊Truffle框架搭建步骤
坑1: 将truffle.js改名为truffle-config.js
坑2: 卸载以太坊Chrome插件
坑3: 将端口号统一
```
npm install -g truffle
npm install -g ethereumjs-testrpc
mkdir truffle
cd truffle
testrpc
truffle unbox webpack
truffle compile
truffle migrate
npm run dev
```

## 区块链简介

区块链的去中心化思想预计几年后会如雨后春笋般一并冒出来！本着搭上这趟时代的列车为原则，着力补充这方面知识，希望能不被其抛下。

区块链目前的环境很错综复杂，相当的繁乱，没有统一的一套体系，比较成型的当属以太坊平台环境。



## 下面是以以太坊为起始进行一些名次的解释：
### 以太坊
以太坊（Ethereum）是一个建立在区块链技术之上， 去中心化应用平台。它允许任何人在平台中建立和使用通过区块链技术运行的去中心化应用。

在没有以太坊之前，写区块链应用是这样的：
1. 拷贝一份比特币代码，
2. 去改底层代码如加密算法，共识机制，网络协议等等（很多山寨币就是这样，改改就出来一个新币）。

以太坊平台对底层区块链技术进行了封装，让区块链应用开发者可以直接基于以太坊平台进行开发，开发者只要专注于应用本身的开发，从而大大降低了难度。

简单理解就是将区块链技术抽离到应用层方便去开发。
目前围绕以太坊已经形成了一个较为完善的开发生态圈：有社区的支持，有很多开发框架、工具可以选择。


### 智能合约
以太坊上的程序称之为智能合约。它是代码和数据(状态)的集合。

智能合约可以理解为在区块链上可以自动执行的（由消息驱动的）、以代码形式编写的合同（特殊的交易）。

智能合约非常适合对信任、安全和持久性要求较高的应用场景，比如：数字货币、数字资产、投票、保险、金融应用、预测市场、产权所有权管理、物联网、点对点交易等等。
目前除数字货币之外，真正落地的应用还不多（就像移动平台刚开始出来一样），相信1到3年内，各种杀手级会慢慢出现。


### 编程语言：Solidity
智能合约的官方推荐的编程语言是Solidity，文件扩展名以.sol结尾。

### 运行环境：EVM
EVM（Ethereum Virtual Machine）以太坊虚拟机是以太坊中智能合约的运行环境。
```
Solidity之于EVM，就像之于跟JVM的关系一样，这样大家就容易理解了。
以太坊虚拟机是一个隔离的环境，外部无法接触到在EVM内部运行的代码。
```

### 以太坊客户端（钱包）
以太坊客户端，其实我们可以把它理解为一个开发者工具，它提供账户管理、挖矿、转账、智能合约的部署和执行等等功能。如：基于Go语言开发的Geth和Mist
```
EVM是由以太坊客户端提供的
```


### Gas
Gas可以认为是一个工作量计费单位，智能合约越复杂（计算步骤的数量和类型，占用的内存等），用来完成运行就需要越多Gas。
Gas的目的是限制执行交易所需的工作量，同时为执行支付费用。当EVM执行交易时，Gas将按照特定规则被逐渐消耗，无论执行到什么位置，一旦Gas被耗尽，将会触发异常。当前调用帧所做的所有状态修改都将被回滚， 如果执行结束还有Gas剩余，这些Gas将被返还给发送账户。
```
如果没有这个限制，就会有人写出无法停止（如：死循环）的合约来阻塞网络。
```

### testrpc
testrpc是在本地使用内存模拟的一个以太坊环境，对于开发调试来说，更方便快捷。而且testrpc可以在启动时帮我们创建10个存有资金的测试账户。
进行合约开发时，可以在testrpc中测试通过后，再部署到Geth节点中去。
```
testrpc已经并入到Truffle 开发框架中，现在名字是Ganache CLI。
```

### Dapp
以太坊社区把基于智能合约的应用称为去中心化的应用程序(Decentralized App)。如果我们把区块链理解为一个不可篡改的数据库，智能合约理解为和数据库打交道的程序，那就很容易理解Dapp了，一个Dapp不单单有智能合约，比如还需要有一个友好的用户界面和其他的东西。


Truffle
Truffle是Dapp开发框架，他可以帮我们处理掉大量无关紧要的小事情，让我们可以迅速开始写代码-编译-部署-测试-打包DApp这个流程。


## [一个不错的博客学习地址](https://learnblockchain.cn/)

