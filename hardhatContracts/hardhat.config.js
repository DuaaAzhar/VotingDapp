require("dotenv").config();
require("@nomicfoundation/hardhat-verify");
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition");

const privateKey = process.env.PRIVATE_KEY
const mumbaiRpcURL = process.env.MUMBAI_RPC_URL
const sepoliaRpcURL = process.env.SEPOLIA_RPC_URL
const etherScanKey = process.env.ETHERSCAN_KEY
const polygonScanKey = process.env.POLYGONSCAN_KEY

module.exports = {
  solidity:{
    version: "0.8.21",
    settings:{
      optimizer:{
        enabled:true,
        runs:200
      }
    }
  },

  networks: {
    sepolia: {
      url: sepoliaRpcURL,
      chainId: 11155111,
      accounts: [`0x${privateKey}`],
    },
    mumbai: {
      url: mumbaiRpcURL,
      chainId: 80001,
      accounts: [`0x${privateKey}`],
    },

  },

  etherscan:{
    // apiKey:etherScanKey,
    apiKey:polygonScanKey,
      
  },

  sourcify: {
    enabled: false,
  },

  ignition: {
    strategyConfig: {
      create2: {
        salt: "0x0000000000000000000000000000000000000000000000000000000000000000",
      },
    },
  },
};
