// //require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-toolbox");

const INFURA_API_KEY = "bafbf8ee79884a05b79fcfba728f28c2";
const ACCOUNT_PRIVATE_KEY = "80a7372676997f86575a4ae8122091f3dcc1d4e023b5b7ee04734de44bb95284";
const ETHERSCAN_API_KEY ="1GCNQTUB3WHXFKKCPKJG7XEMG9HSWBEDK4"


module.exports = {
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      gasPrice: 0,
      initialBaseFeePerGas: 0,
      blockGasLimit: 500_000_000
    },
    development: {
      url: "http://127.0.0.1:8545",
      gas: 0x1ffffffffffffe,
      gasPrice: 0,
      accounts: ["0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3"]
    },
    mumbai: {
      chainId: 80001,
      url: `https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`0x${ACCOUNT_PRIVATE_KEY}`]
    },
    sepolia:{
      chainId: 11155111,
      // url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      // url: `https://api-sepolia.etherscan.io/api/${ETHERSCAN_API_KEY}`,
      url: `https://eth-sepolia.g.alchemy.com/v2/DgcnVZkoA8CTXNY8wd3AwjIIZXe5t5y6`,
      accounts: ["0x80a7372676997f86575a4ae8122091f3dcc1d4e023b5b7ee04734de44bb95284"]
    },
   
    
  },
 
  solidity: {
    version: "0.8.18"
  },
  mocha: {
    timeout: 9_999_999
  }
};



// const MUMBAI_API_KEY = "YT7B3CNUD34VN4NTBB53Q444CTMXI9D8FE";
// module.exports = {
//   solidity: {
//     compilers: [
//       {
//         version: "0.8.0",
//         settings: {
//           optimizer: {
//             enabled: true,
//             runs: 200,
//           },
//         },
//       },
//       {
//         version: "0.8.20",
//         settings: {
//           optimizer: {
//             enabled: true,
//             runs: 200,
//           },
//         },
//       },
//     ],
//   },
//   etherscan: {
//     apiKey: {
//       polygonMumbai: MUMBAI_API_KEY,
//     },
//   },
//   defaultNetwork: "mumbai", 
//   networks: {
//     localhost: {
//       url: "http://127.0.0.1:8545",
//       accounts: ["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"]
//     },
//     tenderly: {
//       url: "https://rpc.vnet.tenderly.co/devnet/tenderly-devnet/b8c5c4d9-e7ea-4d8a-af08-08f6dac769a1",
//       chainId: 11155111,
//     },
//     mumbai: {
//       url: "https://polygon-mumbai.g.alchemy.com/v2/r-WUVuF3BwPo2ke_DquPBDyQzGUUo9e6",
//       chainId: 80001,
//       accounts: ["7defb546e47f1f194035be72c0b413cbe82b8999d104b844ccc1582567888307"]
//     },
//   },
// };