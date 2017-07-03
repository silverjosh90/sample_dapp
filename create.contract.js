var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var contract = './contracts/simple_storage.sol';
var solc = require('solc');
var fs = require('fs');
var dotenv = require('dotenv').load();
var input = fs.readFileSync('contracts/simple_storage.sol').toString();
var eth = web3.eth
var personal = web3.personal

personal.unlockAccount('3a9293aa44d882578a1b826c0acfadbe7222802b', 'PASSWORDFORACCOUNT')


eth.defaultAccount = eth.coinbase;
var account = eth.defaultAccount
var balanceWei = eth.getBalance(account).toNumber();
var balance = web3.fromWei(balanceWei, 'ether')


var output = solc.compile(input , 1);

var abi = JSON.parse(output.contracts[':SimpleStorage'].interface)
var bytecode = output.contracts[':SimpleStorage'].bytecode;

var contract = eth.contract(abi);

var gasEstimate = eth.estimateGas({data: '0x'+bytecode});

var deployedContract = contract.new({
	data: '0x' + bytecode,
	from: '0x3a9293aa44d882578a1b826c0acfadbe7222802b',
	gas: gasEstimate
}, function(err, contract){
	console.log('Err:', err);
	var contractAddress = contract.address;
	var transactionHash = contract.transactionHash;

	console.log('THis is the ABI', JSON.stringify(contract.abi));

	if(contractAddress) {

		var blockNumber = contract._eth.blockNumber;
		console.log('THis is the blockNumber', blockNumber);
		console.log('This is the address', contractAddress);
	}

})
