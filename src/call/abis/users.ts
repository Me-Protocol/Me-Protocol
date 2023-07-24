const WITH_PERMIT = [
    {
      "inputs": [],
      "name": "ADDRESS_ZERO_NOT_ALLOWED",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "INSUFFICIENT_DEPOSIT",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "REWARDS_PERMIT_FAILED",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "REWARDS_TRANSFER_FAILED",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "REWARD_IS_NOT_OPEN",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ZERO_NOT_ALLOWED",
      "type": "error"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "rewardAtHand",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "targettedReward",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amountOfRewardAtHand",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "expectedAmountOfTargetedReward",
              "type": "uint256"
            }
          ],
          "internalType": "struct Params.spendingInfo",
          "name": "info",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "_deadline",
              "type": "uint256"
            },
            {
              "internalType": "uint8",
              "name": "_v",
              "type": "uint8"
            },
            {
              "internalType": "bytes32",
              "name": "_r",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "_s",
              "type": "bytes32"
            }
          ],
          "internalType": "struct Params.PermitParam",
          "name": "permitParam",
          "type": "tuple"
        }
      ],
      "name": "spendRewardsOnAnotherBrandWithPermit",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "reward",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "_deadline",
              "type": "uint256"
            },
            {
              "internalType": "uint8",
              "name": "_v",
              "type": "uint8"
            },
            {
              "internalType": "bytes32",
              "name": "_r",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "_s",
              "type": "bytes32"
            }
          ],
          "internalType": "struct Params.PermitParam",
          "name": "permitParam",
          "type": "tuple"
        }
      ],
      "name": "spendRewardsOnIssuingBrandWithPermit",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

const WITHOUT_PERMIT = [
    {
      "inputs": [],
      "name": "ADDRESS_ZERO_NOT_ALLOWED",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "INSUFFICIENT_DEPOSIT",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "REWARDS_TRANSFER_FAILED",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "REWARD_IS_NOT_OPEN",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ZERO_NOT_ALLOWED",
      "type": "error"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "rewardAtHand",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "targettedReward",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amountOfRewardAtHand",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "expectedAmountOfTargetedReward",
              "type": "uint256"
            }
          ],
          "internalType": "struct Params.spendingInfo",
          "name": "info",
          "type": "tuple"
        }
      ],
      "name": "spendRewardsOnAnotherBrand",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "reward",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "spendRewardsOnIssuingBrand",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]


  export {
    WITHOUT_PERMIT, 
    WITH_PERMIT
  }