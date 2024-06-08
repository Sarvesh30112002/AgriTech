require('babel-register');
require('babel-polyfill');

module.exports = {
  networks: {
    development: {
      host: "",
      port: ,
      network_id: "*" // Match any network id
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
