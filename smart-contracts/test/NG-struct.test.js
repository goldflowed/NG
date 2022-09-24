const {assert} = require('chai')

const NG = artifacts.require('./contracts/NG.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('NG', async (accounts) => {
  let contract

  before(async () => {
    contract = await NG.deployed("NftGuarantee", "NG")
  })

  describe('minting', async() => {
    const ngInfo = {
      brandNm: 'j7e206',
      productNo: 'j7e206',
      serialNo: 'j7e206',
      mfd: 'j7e206',
      madeIn: 'j7e206',
    }
    it('creates a new token', async () => {
      const result = await contract.mint(
        ngInfo.brandNm,
        ngInfo.productNo,
        ngInfo.serialNo,
        ngInfo.mfd,
        ngInfo.madeIn
      )
      const totalSypply = await contract.totalSupply()

      assert.equal(totalSypply, 1)
      
      const event = result.logs[0].args

      assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is the contract')
      assert.equal(event.to, accounts[0], 'to is msg.sender')

      await contract.mint(
        ngInfo.brandNm,
        ngInfo.productNo,
        ngInfo.serialNo,
        ngInfo.mfd,
        ngInfo.madeIn
      ).should.be.rejected
    })
  })
})