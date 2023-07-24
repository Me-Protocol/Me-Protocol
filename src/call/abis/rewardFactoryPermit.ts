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
    "inputs": [],
    "name": "REWARD_DOES_NOT_EXIST",
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
      }
    ],
    "name": "createANewRewardWithPermit",
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
    "name": "createANewRewardWithPermit",
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
        "internalType": "address",
        "name": "initialSupplyReceiver",
        "type": "address"
      }
    ],
    "name": "createANewRewardWithPermit",
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
    "name": "createANewRewardWithPermit",
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
        "internalType": "address",
        "name": "_brand",
        "type": "address"
      }
    ],
    "name": "getRewardByBrand",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_reward",
        "type": "address"
      }
    ],
    "name": "getRewardConfig",
    "outputs": [
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
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_reward",
        "type": "address"
      }
    ],
    "name": "getRewardDetails",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "rewardId",
            "type": "address"
          },
          {
            "internalType": "bytes10",
            "name": "issuingBrand",
            "type": "bytes10"
          },
          {
            "internalType": "uint8",
            "name": "rType",
            "type": "uint8"
          },
          {
            "internalType": "bool",
            "name": "verified",
            "type": "bool"
          },
          {
            "internalType": "address",
            "name": "openRewardId",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "open",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "interspendable",
            "type": "bool"
          },
          {
            "internalType": "uint40",
            "name": "dateCreated",
            "type": "uint40"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "descriptionLink",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "symbol",
            "type": "string"
          }
        ],
        "internalType": "struct RewardData.RewardDetails",
        "name": "details",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]