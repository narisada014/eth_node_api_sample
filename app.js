// ※秘密鍵、公開鍵、http-tpcサーバーはテストネットのものなので安全
// expressサーバーの定義
var express = require('express');
// web3のインポート
var Web3 = require('web3');
// web3のインスタンス作成
var web3 = new Web3();
// web3とgethで起動中のport:8545のhttp-rpcサーバーと接続
web3.setProvider(new web3.providers.HttpProvider('https://ropsten.infura.io/6l7dU6kKHKeUEmDBGq2J'));
// 一番最初に生成したアカウントをデフォルトのアカウントと定義
web3.eth.defaultAccount=web3.eth.accounts[0];

var Wallet = require('ethereumjs-wallet');

// コントラクトのabi定義
var abi = [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
           {"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
           {"inputs":[{"name":"initialSupply","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

// appにexpressサーバーを追加
var app = express();

// テスト用hello world
app.get("/", function(req, res) {
  return res.send('Hello World');
});

// Wallet作成API
app.get("/create_wallet", function(req, res) {
  const account = web3.eth.accounts.create();
  const privateKey = account['privateKey'];
  // コンソールにアカウントが作成されたかどうか表示
  console.log(web3.eth.accounts.privateKeyToAccount(privateKey));
  return res.send(account);
});

// コントラクトからあるアカウントのトークンのバランスを取得するapi
app.get("/balance", function(req, res) {
  var _balance = web3.eth.contract(abi).at("0x2a27f20e2971493ad6d274d2861b62d9f27f55ac").balanceOf("0x8e4b8cbfd0d2872152bbfecb9bc0d398ec41fa32");
  return res.send(_balance);
});

var server = app.listen('4000', function(){
  console.log("Node.js is listening to PORT:" + server.address().port);
});
