var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
web3.eth.defaultAccount=web3.eth.accounts[0];

var abi = [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
           {"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
           {"inputs":[{"name":"initialSupply","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

var _transfer = web3.eth.contract(abi).at("0x2a27f20e2971493ad6d274d2861b62d9f27f55ac").transfer("0xce63d1919f34fbccf291d686beab7c527125480d", 10)
console.log(_transfer);
