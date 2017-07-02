var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var contract = './contracts/simple_storage.sol';
var solc = require('solc');
var fs = require('fs');
var dotenv = require('dotenv').load();


console.log('It is working', web3.eth.blockNumber);

web3.eth.defaultAccount = web3.eth.accounts[0]
var account = web3.eth.defaultAccount
var balanceWei = web3.eth.getBalance(account).toNumber();
var balance = web3.fromWei(balanceWei, 'ether')
console.log('I am the balance', balance);


function getContract(filename) {
  return new Promise(function(resolve,reject){
    fs.readFile(filename, 'utf8', function(err,result){
      resolve(result);
    })
  })
}

getContract(contract).then(function(result){
  var compiled = solc.compile(result, 1);
	metaData = JSON.parse(compiled.contracts[':SimpleStorage'].metadata)
	console.log('THIS IS THE METADATA', metaData.output.abi);


});
