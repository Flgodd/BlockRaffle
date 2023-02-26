const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");

describe("Raffle", function(){
    async function loadContract(){


        const contractFactory = await ethers.getContractFactory("Raffle");
        const contract = await contractFactory.deploy();

        const [ minter, otherSigner] = await ethers.getSigners();
    
        return { contract, minter, otherSigner }
    }
    describe("Entry", function(){
        it("NFT Should mint into sender's address if not already entered", async function(){
            const { contract, minter } = await loadFixture(loadContract)
            await contract.startSale();
            //contracts are deployed using the first signer by default
            await contract.connect(minter).mewnt({value: 1000000});
            //contract.balanceOf implicit using openzepplin
            expect(await contract.balanceOf(minter.address)).to.equal(1);
        })
        it("If already entered raffle expect mint fail", async function(){
            const { contract, minter } = await loadFixture(loadContract)
            await contract.startSale();
            //contracts are deployed using the first signer by default
            await contract.connect(minter).mewnt({value: 1000000});
            //contract.balanceOf implicit using openzepplin
            await expect(contract.connect(minter).mewnt({value: 1000000})).to.be.revertedWith("you have already entered raffle");
        })
    })
    describe("Winners", function(){
        it("should revert if not run by deployer", async function(){
            const { contract, otherSigner } = await loadFixture(loadContract)
            await contract.startSale();

            await expect(contract.connect(otherSigner).pickWinners(10)).to.be.revertedWith("only deployer can run pick winners")
        })
        it("Should give an array of an 10 winners, same as input", async function(){
            const { contract, minter } = await loadFixture(loadContract)
            await contract.startSale();

            let arr = await contract.connect(minter).pickWinners(10)
            expect(arr.size()).to.equal(10)
            
        })
    })
})