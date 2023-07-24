export default [
    {
      "inputs": [],
      "name": "ACCESS_KEY_ALREADY_EXISTS_PLEASE_CHANGE_INSTEAD",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ACCOUNT_IS_NOT_AUTHORIZED_TO_MAKE_THIS_REQUEST",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "BRAND_ID_CANNOT_BE_EMPTY",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "EMPTY_STRING_NOT_ALLOWED",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "REWARD_ALREADY_EXISTS",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "symbol",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "descriptionLink",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "initialSupply",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "initialSupplyReceiver",
          "type": "address"
        }
      ],
      "name": "createANewReward",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes10",
          "name": "brandId",
          "type": "bytes10"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "symbol",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "descriptionLink",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "initialSupply",
          "type": "uint256"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "bountyTriggerLimit",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "bountyContributionInPrecision",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "specificException",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "bountyEnables",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "caiEnabled",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "payIncomingGasFee",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "payOutgoingGasFee",
              "type": "bool"
            }
          ],
          "internalType": "struct RewardData.RewardConfig",
          "name": "config",
          "type": "tuple"
        }
      ],
      "name": "createANewReward",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "symbol",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "descriptionLink",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "initialSupply",
          "type": "uint256"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "bountyTriggerLimit",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "bountyContributionInPrecision",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "specificException",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "bountyEnables",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "caiEnabled",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "payIncomingGasFee",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "payOutgoingGasFee",
              "type": "bool"
            }
          ],
          "internalType": "struct RewardData.RewardConfig",
          "name": "config",
          "type": "tuple"
        }
      ],
      "name": "createANewReward",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "symbol",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "descriptionLink",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "initialSupply",
          "type": "uint256"
        }
      ],
      "name": "createANewReward",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]