pragma solidity ^0.5.0;

import "./Token.sol";

contract EthSwap {
	string public name = "EthSwap Instant Exchange";
    Token public token;
    uint public rate = 100;

    event TokensPurchased(
    address account,
    address token,
    uint amount,
    uint rate
    );

    event TokensSold(
    address account,
    address token,
    uint amount,
    uint rate
    );

   constructor(Token _token) public {
     token = _token;		
   }
   function buyTokens() public payable {
    // transfer tokens to buyer msg.sender - msg is global variable and sender is the address calling the function
   	// redemption rate - the # of tokens they receive for 1 ether
    // amount of ethereum * redemption rate. value is special variable in solidity that
    // tells you how much eth was sent hen the function was called.
   	//calculate the number of tokens to buy

   		uint tokenAmount = msg.value * rate;

   		// require that EthSwap has enough tokens
   		// require keyword - when evaluates to true, the functioin continues to execute, when false stops executing the function.

   		require(token.balanceOf(address(this)) >= tokenAmount);

        // Transfer tokens to the user
        token.transfer(msg.sender, tokenAmount);

        // Emit an event (tokens purchased)
        emit TokensPurchased(msg.sender, address(token), tokenAmount, rate );
     
   }

function sellTokens(uint _amount) public {
	// User can't sell more tokens than they have
	require(token.balanceOf(msg.sender) >= _amount);


	// Calculate the amount of etther to redeem.
	uint etherAmount = _amount / rate;

	// Require t)hat EthSwap has enough Ether
	require (address(this).balance >= etherAmount);
	
	// Perform sale 
	//use of transferFrom function of erc-20 tokens. 
	//Approve function must be called first

	token.transferFrom(msg.sender, address(this), _amount);
	msg.sender.transfer(etherAmount);

	// Emit an event
	emit TokensSold(msg.sender, address(token), _amount, rate);
}

}
