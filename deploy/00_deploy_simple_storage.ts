import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { developmentChains, networkConfig } from '../helper-hardhat-config'
import verify from '../utils/verify'

const deploySimpleStorage: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { getNamedAccounts, deployments, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log('Deploying SimpleStorage and waiting for confirmations...')
    const simpleStorage = await deploy('SimpleStorage', {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: networkConfig[network.name].blockConfirmations || 0
    })
    log(
        `SimpleStorage deployed at ${simpleStorage.address} from deployer ${deployer}`
    )
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(simpleStorage.address, [])
    }
}
export default deploySimpleStorage
deploySimpleStorage.tags = ['all', 'simpleStorage']
