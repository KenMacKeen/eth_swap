pragma solidity ^0.5.0;

import "./Token.sol";

contract EthSwap {
	string public name = "EthSwap Instant Exchange";
    Token public token;
    uint public rate = 100;

   constructor(Token _token) public {
   token = _token;		
   }
   function buyTokens() public payable{
    // transfer tokens to buyer msg.sender - msg is global variable and sender is the address calling the function
   	// redemption rate - the # of tokens they receive for 1 ether
    // amount of ethereum * redemption rate. value is special variable in solidity that
    // tells you how much eth was sent hen the function was called.
   		//calculate the number of tokens to buy
   		uint tokenAmount = msg.value * rate;
        token.transfer(msg.sender, tokenAmount);
     
   }
}
