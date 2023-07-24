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
      "name": "ADDRESS_ZERO_NOT_ALLOWED",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "REWARD_ALREADY_OPEN",
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
          "internalType": "address",
          "name": "rewardToken",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "meToken",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "rOptimal",
              "type": "uint256"
            },
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
          "internalType": "struct Params.ConfigForTypeAOpenRewards",
          "name": "config",
          "type": "tuple"
        },
        {
          "internalType": "address",
          "name": "openRewardsTypeA",
          "type": "address"
        }
      ],
      "name": "setUpOpenRewards",
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