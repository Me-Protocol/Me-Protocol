export default [
    {
      "inputs": [],
      "name": "REWARD_DOES_NOT_EXIST",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "REWARD_IS_NOT_OPEN",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "inputReward",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "outputReward",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amountOut",
          "type": "uint256"
        }
      ],
      "name": "getAmountIn",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]