export default [
    {
      "inputs": [],
      "name": "ACCESS_KEY_ALREADY_EXISTS_PLEASE_CHANGE_INSTEAD",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ALREADY_INITIALIZED",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "BRAND_ID_CANNOT_BE_EMPTY",
      "type": "error"
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
          "name": "rewardName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "rewardSymbol",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "rewardDescriptionLink",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "rewardType",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "initialRewardSupply",
          "type": "uint256"
        }
      ],
      "name": "createFungibleRewardForBrand",
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
          "name": "initialRewardDeposit",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "initialMeDeposit",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "rOptimalInTens",
          "type": "uint8"
        },
        {
          "internalType": "bool",
          "name": "autoStartConversation",
          "type": "bool"
        }
      ],
      "name": "createTypeAOpenRewardsForBrand",
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
          "components": [
            {
              "internalType": "uint256",
              "name": "defaultMinimumMeForConversation",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "defaultMinimumRewardForConversationInPercent",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "defaultMaximumRLimitForConversationInPrecision",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "defaultRewardNotifyThresholdInPercent",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "defaultNotifyMeAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "defaultNotifyRewardAmountInPercent",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "caiInMe",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "protocolFee",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "bountyContributionInPrecision",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "conversationSlippageInPrecision",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "informationSlippageInPrecision",
              "type": "uint256"
            }
          ],
          "internalType": "struct Params.EditableProtocolConfig",
          "name": "config",
          "type": "tuple"
        },
        {
          "internalType": "address",
          "name": "forwardedAddress",
          "type": "address"
        }
      ],
      "name": "initializeProtocol",
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
          "internalType": "bytes10",
          "name": "brandId",
          "type": "bytes10"
        },
        {
          "internalType": "address",
          "name": "reward",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "descriptionLink",
          "type": "string"
        }
      ],
      "name": "integrateExistingFungibleRewardForBrand",
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
      "name": "provideMeLiquidityForOpenReward",
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
          "internalType": "string",
          "name": "brandName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "brandOnlinePresence",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "brandAccount",
          "type": "address"
        }
      ],
      "name": "registerBrand",
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
          "name": "newForwarder",
          "type": "address"
        }
      ],
      "name": "setForwarderAddress",
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
          "internalType": "bytes10",
          "name": "brandId",
          "type": "bytes10"
        },
        {
          "components": [
            {
              "internalType": "bool",
              "name": "enableBountyRewards",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "enableCais",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "payIncomingGasFees",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "payOutgoingGasFees",
              "type": "bool"
            }
          ],
          "internalType": "struct Params.EditableBrandConfig",
          "name": "config",
          "type": "tuple"
        },
        {
          "internalType": "bool",
          "name": "ignoreDefault",
          "type": "bool"
        }
      ],
      "name": "updateBrandConfigurationsForBrand",
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
          "internalType": "bytes10",
          "name": "brand",
          "type": "bytes10"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "onlinePresence",
              "type": "string"
            }
          ],
          "internalType": "struct Params.EditableBrandDetails",
          "name": "config",
          "type": "tuple"
        },
        {
          "internalType": "bool",
          "name": "ignoreDefault",
          "type": "bool"
        }
      ],
      "name": "updateBrandDetailsForBrand",
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
          "components": [
            {
              "internalType": "uint256",
              "name": "defaultMinimumMeForConversation",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "defaultMinimumRewardForConversationInPercent",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "defaultMaximumRLimitForConversationInPrecision",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "defaultRewardNotifyThresholdInPercent",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "defaultNotifyMeAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "defaultNotifyRewardAmountInPercent",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "caiInMe",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "protocolFee",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "bountyContributionInPrecision",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "conversationSlippageInPrecision",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "informationSlippageInPrecision",
              "type": "uint256"
            }
          ],
          "internalType": "struct Params.EditableProtocolConfig",
          "name": "config",
          "type": "tuple"
        },
        {
          "internalType": "bool",
          "name": "ignoreDefault",
          "type": "bool"
        }
      ],
      "name": "updateProtocolConfigurations",
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
          "components": [
            {
              "internalType": "address",
              "name": "meId",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "bountyId",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "treasuryId",
              "type": "address"
            },
            {
              "internalType": "bytes10",
              "name": "adminId",
              "type": "bytes10"
            }
          ],
          "internalType": "struct Params.EditableProtocolRecords",
          "name": "records",
          "type": "tuple"
        },
        {
          "internalType": "bool",
          "name": "ignoreDefault",
          "type": "bool"
        }
      ],
      "name": "updateProtocolRecords",
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
          "name": "newTreasury",
          "type": "address"
        }
      ],
      "name": "updateTreasuryAddress",
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
