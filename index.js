var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var contract = './contracts/simple_storage.sol';
var solc = require('solc');
var fs = require('fs');
var dotenv = require('dotenv').load();
var input = fs.readFileSync('contracts/simple_storage.sol').toString();

web3.personal.unlockAccount('ADDRESS', 'PLACEPASSWORDHERE')


web3.eth.defaultAccount = web3.eth.coinbase;
var account = web3.eth.defaultAccount
var balanceWei = web3.eth.getBalance(account).toNumber();
var balance = web3.fromWei(balanceWei, 'ether')
console.log('I am the balance', balance);


var output = solc.compile(input , 1);

var abi = JSON.parse(output.contracts[':SimpleStorage'].interface)
var bytecode = output.contracts[':SimpleStorage'].bytecode;

var contract = web3.eth.contract(abi);

var gasEstimate = web3.eth.estimateGas({data: '0x'+bytecode});

console.log('HERE IS THE ESTIMATE', gasEstimate);
var deployedContract = contract.new({
	data: '0x' + bytecode,
	from: web3.eth.coinbase,
	gas: gasEstimate
}, function(err, contract){
	console.log('THIS IS THE ERR', err);
	console.log('THIS IS THE result', contract);
})


var transactionHash = deployedContract.transactionHash;
var contractAddress = deployedContract.address;


console.log('THIS IS THE TRANSACTIONHash', transactionHash);
console.log('THIS IS THE contract address', contractAddress);
