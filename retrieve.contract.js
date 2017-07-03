var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var contract = './contracts/simple_storage.sol';
var solc = require('solc');
var fs = require('fs');
var dotenv = require('dotenv').load();
var input = fs.readFileSync('contracts/simple_storage.sol').toString();
var eth = web3.eth
var personal = web3.personal

eth.defaultAccount = eth.coinbase;
var account = eth.defaultAccount
var balanceWei = eth.getBalance(account).toNumber();
var balance = web3.fromWei(balanceWei, 'ether')

personal.unlockAccount('3a9293aa44d882578a1b826c0acfadbe7222802b', 'PASSWORDFORACCOUNT')


var output = solc.compile(input , 1);

var abi = JSON.parse(output.contracts[':SimpleStorage'].interface)
var bytecode = output.contracts[':SimpleStorage'].bytecode;

var contract = eth.contract(abi);

var myContract = contract.at('0xf37981f67506d5138f6e12c7a9d202a22a5e46ff')
myContract.set.sendTransaction(64352432, {from: '0x3a9293aa44d882578a1b826c0acfadbe7222802b'})

myContract.get(function(err,data){
  console.log('HERE IS MY DATA', JSON.stringify(data));
  console.log('HERE IS MY ERR', err);
})
