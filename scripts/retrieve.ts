import { ethers } from 'hardhat'

async function main() {
    const simpleStorage = await ethers.getContractAt(
        'SimpleStorage',
        '0x5FbDB2315678afecb367f032d93F642f64180aa3'
    )

    const currentValue = await simpleStorage.retrieve()
    console.log(`Current value is ${currentValue}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
