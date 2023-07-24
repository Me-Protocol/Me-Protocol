import { BigNumber, Signer, Wallet, ethers } from "ethers";
import { brandContract, rewardFactory, poolFactory, getPermitSignature, rewardWithPermit, meToken } from "../contracts";
import { ME_TOKEN, OPEN_REWARD_DIAMOND, OPEN_REWARD_IMPLEMENTATION, genPoolConfig } from "../constants";




export interface EditableBrandDetails {
    name: string
    onlinePresence: string
}

export interface EditableBrandConfig {
    enableBountyRewards: boolean
    enableCais: boolean
    payIncomingGasFees: boolean
    payOutgoingGasFees: boolean
}

export interface EditableRewardConfig {
    specificException: boolean
    bountyEnables: boolean
    caiEnabled: boolean
    bountyTriggerLimit: number
    bountyContributionInPrecision: number
    payIncomingGasFee: boolean
    payOutgoingGasFee: boolean
}


export interface EditableRewardDetails {
    name: string
    symbol: string
    descriptionLink: string
}

export interface EditableConfigForTypeAOpenRewards {
    maximumRLimit: number | BigNumber
    minimumRewardAmountForConversation: number | BigNumber
    minimumMeAmountForConversation: number | BigNumber
    notifyRewardAmount: number | BigNumber
    notifyMeAmount: number | BigNumber
    defaultSlippageInPrecision: number | BigNumber
    allowSwaps: boolean
}

export interface ConfigForTypeAOpenRewards {
    rOptimal: number | BigNumber
    maximumRLimit: number | BigNumber
    minimumRewardAmountForConversation: number | BigNumber
    minimumMeAmountForConversation: number | BigNumber
    notifyRewardAmount: number | BigNumber
    notifyMeAmount: number | BigNumber
    defaultSlippageInPrecision: number | BigNumber
    allowSwaps: boolean
}

export class brandService {
    static async register(name: string, onlinePresence: string) : Promise<any> {
        return brandContract.populateTransaction["register(string,string)"](
            name,
            onlinePresence
        );
    }

    static async updateDetails(brandId: string = "__none__", details: EditableBrandDetails, ignoreDefault: boolean) : Promise<any> {
        if (brandId == "__none__") {
            return brandContract.populateTransaction["updateDetails((string,string),bool)"](
                details,
                ignoreDefault
            );
        } else {
            brandContract.populateTransaction["u"]
            return brandContract.populateTransaction["updateDetails(bytes10,(string,string),bool)"](
                brandId,
                details,
                ignoreDefault
            );
        }
    }

    static async updateGeneralConfigurations(brandId: string = "__none__", config: EditableBrandConfig, ignoreDefault: boolean) : Promise<any> {
        if (brandId == "__none__") {
            return brandContract.populateTransaction["updateGeneralConfigurations((bool,bool,bool,bool),bool)"](
                config,
                ignoreDefault
            );
        } else {
            return brandContract.populateTransaction["updateGeneralConfigurations(bytes10,(bool,bool,bool,bool),bool)"](
                brandId,
                config,
                ignoreDefault
            );
        }
    }

    static async updateRewardConfigurations(brandId: string = "__none__", reward: string, config: EditableRewardConfig, ignoreDefault: boolean) : Promise<any> {
        if (brandId == "__none__") {
            return brandContract.populateTransaction["updateRewardConfigurations(address,(bool,bool,bool,uint256,uint256,bool,bool),bool)"](
                reward,
                config,
                ignoreDefault
            );
        } else {
            return brandContract.populateTransaction["updateRewardConfigurations(bytes10,address,(bool,bool,bool,uint256,uint256,bool,bool),bool)"](
                brandId,
                reward,
                config,
                ignoreDefault
            );
        }
    }

    static async updateRewardDetails(brandId: string = "__none__", reward: string, details: EditableRewardDetails, ignoreDefault: boolean) : Promise<any> {
        if (brandId == "__none__") {
            return brandContract.populateTransaction["updateRewardDetails(address,(string,string,string),bool)"](
                reward,
                details,
                ignoreDefault
            );
        } else {
            return brandContract.populateTransaction["updateRewardDetails(bytes10,address,(string,string,string),bool)"](
                brandId,
                reward,
                details,
                ignoreDefault
            );
        }
    }

    static async updateOpenRewardsConfigurations(reward: string, config: EditableConfigForTypeAOpenRewards, ignoreDefault: boolean) : Promise<any> {
        return brandContract.populateTransaction["updateOpenRewardsConfigurations(address,(uint256,uint256,uint256,uint256,uint256,uint256,bool),bool)"](
            reward,
            config,
            ignoreDefault
        );
    }

    static async integrateExistingFungibleRewards(reward: string, rewardDescriptionLink: string, readTandC: boolean) : Promise<any> {
        return brandContract.populateTransaction["integrateExistingFungibleRewards(address,string,bool)"](
            reward,
            rewardDescriptionLink,
            readTandC
        );
    }

    static async changeOptimalValuationForOpenRewards(reward: string, newOptimalValution: number) : Promise<any> {
        return brandContract.populateTransaction["changeOptimalValuationForOpenRewards(address,uint256)"](
            reward,
            newOptimalValution
        );
    }

    static async activateOpenRewards(reward: string) : Promise<any> {
        return brandContract.populateTransaction["activateOpenRewards(address)"](
            reward
        );
    }

    static async pauseOpenRewards(reward: string) : Promise<any> {
        return brandContract.populateTransaction["pauseOpenRewards(address)"](
            reward
        );
    }

    static async resumeOpenRewards(reward: string) : Promise<any> {
        return brandContract.populateTransaction["resumeOpenRewards(address)"](
            reward
        );
    }

    static async topUpOpenRewardsLiquidityPermit(signer: Signer | Wallet, reward: string, rewardAmount: number | BigNumber, meAmount: number | BigNumber) : Promise<any> {
        console.log("Reward Address (I am current running permit)", reward);
        
        // generate permit params for reward token
        const permitParamsReward = await getPermitSignature(
            signer,
            rewardWithPermit(reward),   
            OPEN_REWARD_DIAMOND,
            rewardAmount,
            ethers.constants.MaxUint256
        );

        console.log("Reward Permit params has been created", permitParamsReward);

        const permitParamsMe = await getPermitSignature(
            signer,
            meToken,
            OPEN_REWARD_DIAMOND,
            meAmount,
            ethers.constants.MaxUint256
        );

        console.log("Me Permit params has been created", permitParamsMe);

        // generate permit params for me token
        return brandContract.populateTransaction["topUpOpenRewardsLiquidityPermit(address,uint256,uint256,(uint256,uint8,bytes32,bytes32),(uint256,uint8,bytes32,bytes32))"](
            reward,
            rewardAmount,
            meAmount,
            {
                _deadline: ethers.constants.MaxUint256,
                _v: permitParamsReward.v,
                _r: permitParamsReward.r,
                _s: permitParamsReward.s
            },
            {
                _deadline: ethers.constants.MaxUint256,
                _v: permitParamsMe.v,
                _r: permitParamsMe.r,
                _s: permitParamsMe.s
            }
        );
    }

    static async topUpOpenRewardsLiquidity(reward: string, rewardAmount: number, meAmount: number) : Promise<any> {
        return brandContract.populateTransaction["topUpOpenRewardsLiquidity(address,uint256,uint256)"](
            reward,
            rewardAmount,
            meAmount
        );
    }

    static async topUpOpenRewardsLiqudityFromTreasury(reward: string, rewardAmount: number, meAmount: number) : Promise<any> {
        return brandContract.populateTransaction["topUpOpenRewardsLiqudityFromTreasury(address,uint256,uint256)"](
            reward,
            rewardAmount,
            meAmount
        );
    }

    static async withdrawOpenRewardsLiquidity(reward: string, position: number | null = null, rewardAmount: number, meAmount: number, to: string) : Promise<any> {
        if (position == null) {
            return brandContract.populateTransaction["withdrawOpenRewardsLiquidity(address,uint256,uint256,address)"](
                reward,
                rewardAmount,
                meAmount,
                to
            );
        } else {
            return brandContract.populateTransaction["withdrawOpenRewardsLiquidity(address,uint256,uint256,uint256,address)"](
                reward,
                position,
                rewardAmount,
                meAmount,
                to
            );
        }
    }

    static async setBountyTriggerLimit(reward: string, triggerLimit: number) : Promise<any> {
        return brandContract.populateTransaction["setBountyTriggerLimit(address,uint256)"](
            reward,
            triggerLimit
        );
    }

    static async addRewardsToBountyPool(reward: string, amount: number) : Promise<any> {
        return brandContract.populateTransaction["addRewardsToBountyPool(address,uint256)"](
            reward,
            amount
        );
    }

    static async addRewardsFromTreasuryToBountyPool(reward: string, amount: number) : Promise<any> {
        return brandContract.populateTransaction["addRewardsFromTreasuryToBountyPool(address,uint256)"](
            reward,
            amount
        );
    }

    static async withdrawRewardsFromBountyPool(reward: string, amount: number, to: string) : Promise<any> {
        return brandContract.populateTransaction["withdrawRewardsFromBountyPool(address,uint256,address)"](
            reward,
            amount,
            to
        );
    }

    static async fundTreasury(reward: string, rewardAmount: number, meAmount: number) : Promise<any> {
        return brandContract.populateTransaction["fundTreasury(address,uint256,uint256)"](
            reward,
            rewardAmount,
            meAmount
        );
    }
    
    static async withdrawFromTreasury(reward: string, rewardAmount: number, meAmount: number) : Promise<any> {
        return brandContract.populateTransaction["withdrawFromTreasury(address,uint256,uint256,address)"](
            reward,
            rewardAmount,
            meAmount
        );
    }

    static async grantRoleForRewardsManagement(reward: string, role: string, account: string) : Promise<any> {
        return brandContract.populateTransaction["grantRoleForRewardsManagement(address,bytes32,address)"](
            reward,
            role,
            account
        );
    }

    static async revokeAccountFromRewardManagementRole(reward: string, role: string, account: string) : Promise<any> {
        return brandContract.populateTransaction["revokeAccountFromRewardManagementRole(address,bytes32,address)"](
            reward,
            role,
            account
        );
    }

    static async changeMainAccount(newMainAccount: string) : Promise<any> {
        return brandContract.populateTransaction["changeMainAccount(address)"](
            newMainAccount
        );
    }

    static async getBrandConfigByAddress(brandAddress: string) : Promise<any> {
        return await brandContract["getBrandConfigByAddress(address)"](
            brandAddress
        );
    }

    static async getBrandConfigById(brandId: string) : Promise<any> {
        return await brandContract["getBrandConfigById(bytes10)"](
            brandId
        );
    }

    static async createNewReward(
        name: string, 
        symbol: string,
        descriptionLink: string,
        totalSupply: number | BigNumber,
        to: string
    ) : Promise<any> {
        return rewardFactory.populateTransaction["createANewRewardWithPermit(string,string,string,uint256,address)"](
            name,
            symbol,
            descriptionLink,
            totalSupply,
            to
        );
    }

    static async getRewardDetails(rewardAddress: string) : Promise<any> {      
        return await rewardFactory["getRewardDetails(address)"](
            rewardAddress
        );
    }

    static async getRewardConfig(rewardAddress: string) : Promise<any> {      
        return await rewardFactory["getRewardConfig(address)"](
            rewardAddress
        );
    }

    static async getRewardAddress(brandAddress: string) : Promise<any> {      
        return await rewardFactory["getRewardByBrand(address)"](
            brandAddress
        );
    }

    static async createPool(
        rewardAddress: string, 
    ) : Promise<any> {
        return poolFactory.populateTransaction["setUpOpenRewards(address,address,(uint256,uint256,uint256,uint256,uint256,uint256,uint256,bool),address)"](
            rewardAddress,
            ME_TOKEN,
            genPoolConfig(),
            OPEN_REWARD_IMPLEMENTATION
        );
    }

    static async createMoreRewards(
        amount: number | BigNumber,
        to: string, 
    ) : Promise<any> {
        return poolFactory.populateTransaction["createMoreRewards(uint256,address)"](
            amount,
            to
        );
    }
}