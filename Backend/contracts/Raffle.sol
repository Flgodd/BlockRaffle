pragma solidity ^0.8.9;
//import openzeppelin token standard function
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";
// Import this file to use console.log
import "hardhat/console.sol";
//when you make an nft write all its state variables and all the functionality you want it to have

contract Raffle is ERC721 {

    bool public saleStarted = false;
    address public minter;
    uint256 NFTprice = 1000000;
    uint internal nextTokenId = 0;

    constructor() ERC721("Raffle", "rNFT") {
        minter = msg.sender;
    }
    //function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721) { }


    function mewnt() external payable{
        //nft will cost 0.35 eth
        require(saleStarted == true, "sale has not started");
        require(msg.value >=  NFTprice, "insufficent ETH");
        require(balanceOf(msg.sender) == 0, "you have already entered raffle");
        nextTokenId++;
        _safeMint(msg.sender, nextTokenId);
    }

    function startSale() public returns(bool) {
        require(msg.sender == minter);
        saleStarted = true;
        return saleStarted;
    }

    function pauseSale() public  {
        require(msg.sender == minter);
        saleStarted = false;
    }

    function generateRandomNumber() internal view returns (uint) {
        uint randomHash = uint(keccak256(block.timestamp));

        return randomHash % nextTokenId;
    }

    function arrayContains(uint value, uint[] memory array) public pure returns (bool) {
        for (uint i = 0; i < array.length; i++) {
            if (array[i] == value) {
                return true;
            }
        }
        return false;
    }
    function pickWinners(uint numWinners) public view returns(uint[] memory){
        require(msg.sender == minter, "only deployer can run pick winners");
        uint[] memory winners;
        for(uint i = 0; i < numWinners; i++){
            uint winner = generateRandomNumber();
            while(arrayContains(winner, winners)){
                winner = generateRandomNumber();
            }
            winners[i] = winner;   
        }
        return winners;
    }
}