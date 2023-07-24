export default [
  {
    "inputs": [],
    "name": "ACCESS_KEY_ALREADY_EXISTS_PLEASE_CHANGE_INSTEAD",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ACCOUNT_ALREADY_HAS_ACCESS",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ACCOUNT_DOES_NOT_HAVE_ACCESS",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ACCOUNT_IS_NOT_AUTHORIZED_TO_MAKE_THIS_REQUEST",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ACCOUNT_IS_NOT_REGISTERED_AS_A_BRAND",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ADDRESS_ZERO_NOT_ALLOWED",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "BOTH_DEPOSITS_CAN_NOT_BE_ZERO",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "BOTH_TOP_UPS_CANNOT_BE_ZERO",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "BOTH_WITHDRAWALS_CANNOT_BE_ZERO",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "BRAND_DOES_NOT_EXIST",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "BRAND_ID_CANNOT_BE_EMPTY",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "PLEASE_READ_TERMS_AND_CONDITIONS",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "REQUESTOR_HAS_NO_POSITION",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "REQUESTOR_IS_NOT_ADMIN_FOR_THIS_ACCESS_KEY",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "REQUESTOR_IS_NOT_REWARD_ISSUER",
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
    "name": "REWARD_ALREADY_EXISTS",
    "type": "error"
  },
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
    "inputs": [],
    "name": "REWARD_NAME_CANNOT_BE_EMPTY",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "REWARD_SYMBOL_CANNOT_BE_EMPTY",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SEEDS_ARE_TOO_MUCH",
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
        "internalType": "address",
        "name": "reward",
        "type": "address"
      }
    ],
    "name": "activateOpenRewards",
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
    "name": "addRewardsFromTreasuryToBountyPool",
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
    "name": "addRewardsToBountyPool",
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
        "name": "newMainAccount",
        "type": "address"
      }
    ],
    "name": "changeMainAccount",
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
        "name": "newOptimalValution",
        "type": "uint256"
      }
    ],
    "name": "changeOptimalValuationForOpenRewards",
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
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      }
    ],
    "name": "createMoreRewards",
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
        "name": "rewardAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "meAmount",
        "type": "uint256"
      }
    ],
    "name": "fundTreasury",
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
        "name": "brandAddress",
        "type": "address"
      }
    ],
    "name": "getBrandConfigByAddress",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "bytes10",
            "name": "brandId",
            "type": "bytes10"
          },
          {
            "internalType": "address",
            "name": "mainAccount",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "onlinePresence",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "dateJoined",
            "type": "uint256"
          }
        ],
        "internalType": "struct BrandData.BrandDetails",
        "name": "details",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes10",
        "name": "brandId",
        "type": "bytes10"
      }
    ],
    "name": "getBrandConfigById",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "bytes10",
            "name": "brandId",
            "type": "bytes10"
          },
          {
            "internalType": "address",
            "name": "mainAccount",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "onlinePresence",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "dateJoined",
            "type": "uint256"
          }
        ],
        "internalType": "struct BrandData.BrandDetails",
        "name": "details",
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
        "name": "reward",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "grantRoleForRewardsManagement",
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
        "internalType": "string",
        "name": "rewardDescriptionLink",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "readTandC",
        "type": "bool"
      }
    ],
    "name": "integrateExistingFungibleRewards",
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
      }
    ],
    "name": "pauseOpenRewards",
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
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "onlinePresence",
        "type": "string"
      }
    ],
    "name": "register",
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
      }
    ],
    "name": "resumeOpenRewards",
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
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "revokeAccountFromRewardManagementRole",
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
        "name": "triggerLimit",
        "type": "uint256"
      }
    ],
    "name": "setBountyTriggerLimit",
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
        "name": "rewardAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "meAmount",
        "type": "uint256"
      }
    ],
    "name": "topUpOpenRewardsLiqudityFromTreasury",
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
        "name": "rewardAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "meAmount",
        "type": "uint256"
      }
    ],
    "name": "topUpOpenRewardsLiquidity",
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
        "name": "rewardAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "meAmount",
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
        "name": "permitParamsReward",
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
        "name": "permitParamsMe",
        "type": "tuple"
      }
    ],
    "name": "topUpOpenRewardsLiquidityPermit",
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
        "name": "details",
        "type": "tuple"
      },
      {
        "internalType": "bool",
        "name": "ignoreDefault",
        "type": "bool"
      }
    ],
    "name": "updateDetails",
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
        "name": "details",
        "type": "tuple"
      },
      {
        "internalType": "bool",
        "name": "ignoreDefault",
        "type": "bool"
      }
    ],
    "name": "updateDetails",
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
    "name": "updateGeneralConfigurations",
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
    "name": "updateGeneralConfigurations",
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
        "components": [
          {
            "internalType": "uint256",
            "name": "maximumRLimit",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "minimumRewardAmountForConversation",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "minimumMeAmountForConversation",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "notifyRewardAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "notifyMeAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "defaultSlippageInPrecision",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "allowSwaps",
            "type": "bool"
          }
        ],
        "internalType": "struct Params.EditableConfigForTypeAOpenRewards",
        "name": "config",
        "type": "tuple"
      },
      {
        "internalType": "bool",
        "name": "ignoreDefault",
        "type": "bool"
      }
    ],
    "name": "updateOpenRewardsConfigurations",
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
        "components": [
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
            "name": "payIncomingGasFee",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "payOutgoingGasFee",
            "type": "bool"
          }
        ],
        "internalType": "struct Params.EditableRewardConfig",
        "name": "config",
        "type": "tuple"
      },
      {
        "internalType": "bool",
        "name": "ignoreDefault",
        "type": "bool"
      }
    ],
    "name": "updateRewardConfigurations",
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
        "components": [
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
            "name": "payIncomingGasFee",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "payOutgoingGasFee",
            "type": "bool"
          }
        ],
        "internalType": "struct Params.EditableRewardConfig",
        "name": "config",
        "type": "tuple"
      },
      {
        "internalType": "bool",
        "name": "ignoreDefault",
        "type": "bool"
      }
    ],
    "name": "updateRewardConfigurations",
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
        "components": [
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
          }
        ],
        "internalType": "struct Params.EditableRewardDetails",
        "name": "details",
        "type": "tuple"
      },
      {
        "internalType": "bool",
        "name": "ignoreDefault",
        "type": "bool"
      }
    ],
    "name": "updateRewardDetails",
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
        "components": [
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
          }
        ],
        "internalType": "struct Params.EditableRewardDetails",
        "name": "details",
        "type": "tuple"
      },
      {
        "internalType": "bool",
        "name": "ignoreDefault",
        "type": "bool"
      }
    ],
    "name": "updateRewardDetails",
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
        "name": "rewardAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "meAmount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "withdrawFromTreasury",
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
        "name": "position",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "rewardAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "meAmount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "withdrawOpenRewardsLiquidity",
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
        "name": "rewardAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "meAmount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "withdrawOpenRewardsLiquidity",
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
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "withdrawRewardsFromBountyPool",
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