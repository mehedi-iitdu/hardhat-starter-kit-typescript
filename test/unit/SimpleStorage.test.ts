import { expect } from 'chai'
import { ethers, network } from 'hardhat'
import { developmentChains } from '../../helper-hardhat-config'
import { SimpleStorage, SimpleStorage__factory } from '../../typechain-types'

describe('SimpleStorage', function () {
    let simpleStorage: SimpleStorage
    let SimpleStorageFactory: SimpleStorage__factory

    this.beforeAll(async function () {
        if (!developmentChains.includes(network.name)) {
            throw 'You need to be on a development chain to run tests'
        }
        SimpleStorageFactory = (await ethers.getContractFactory(
            'SimpleStorage'
        )) as SimpleStorage__factory
        simpleStorage = await SimpleStorageFactory.deploy()
        await simpleStorage.deployed()
    })

    beforeEach(async () => {
        // what needs to be done before each test case goes here
    })

    it('Should start with a favorite number of 0', async function () {
        let currentValue = await simpleStorage.retrieve()
        expect(currentValue).to.equal(0)
    })

    it('Should update when we call store', async function () {
        let expectedValue = 7
        let transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait()
        let currentValue = await simpleStorage.retrieve()
        expect(currentValue).to.equal(expectedValue)
    })
})
