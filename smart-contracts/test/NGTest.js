//  const NG = artifacts.require("NG");

//  contract("NftCreator", (accounts) => {
//      const name = "SsafyNFT";
//      const symbol = "SSF";
//      const contractOwner = accounts[0];
 
//      let nftCreatorInstance;
 
//      before(async function () {
//          nftCreatorInstance = await NftCreator.new(name, symbol, {
//              from: contractOwner,
//          });
//      })
 
 
//      it("NFT mint, transfer, and compare URI", async () => {
//          const sender = accounts[1];
//          const receiver = accounts[2];
//          const tokenURI = "tokenURI://test-uri";
//          let tokenIds = [];
//          for (let i=0; i<3; i++) {
//              let outTokenId = await nftCreatorInstance.create.call(
//                  sender,
//                  tokenURI,
//                  {
//                      from: sender,
//                  }
//              );
//              tokenIds.push(outTokenId.toNumber());
     
//          }
//          await nftCreatorInstance.create(sender, tokenURI, {from: sender,});
 
//          for (let i=0; i<3; i++) {
//              let tokenId = tokenIds[i];
//              let owner = await nftCreatorInstance.ownerOf(tokenId);
//              assert.equal(sender, owner, "NFT Mint Failed");
//              let tokenURIFetched = await nftCreatorInstance.tokenURI(tokenId);
//              assert.equal(tokenURI, tokenURIFetched, "Wrong Token Id or URI.")
//          }
 
//          let tokenId = tokenIds[0];
//          // let tokenId = tokenIds;
//          // assert.equal(sender, owner, "NFT Mint Failed.");
//          // let tokenURIFetched = await nftCreatorInstance.tokenURI(tokenId);
//          // assert.equal(tokenURI, tokenURIFetched, "Wrong Token Id or URI.")
 
//          await nftCreatorInstance.transferFrom(sender, receiver, tokenId, {
//              from: sender,
//          });
//          let owner = await nftCreatorInstance.ownerOf(tokenId);
//          assert.equal(receiver, owner, "NFT Transfer Failed.");
 
//          // TODO
//          // 다음이 반드시 테스트되어야 합니다.
 
 
//      });
 
//  });