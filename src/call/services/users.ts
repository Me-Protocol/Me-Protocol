import { BigNumber, Signer, Wallet, ethers } from "ethers";
import { getPermitSignature, meToken, rewardWithPermit, userContractWithPermit, userContractWithoutPermit } from "../contracts";
import { OPEN_REWARD_DIAMOND } from "../constants";


interface PermitParams {
    _deadline: number,
    _v: number,
    _r: string,
    _s: string
}

export interface SpendingInfo {
    rewardAtHand: string
    targettedReward: string
    amountOfRewardAtHand: number | BigNumber
    expectedAmountOfTargetedReward: number | BigNumber
}



export class usersServiceWithoutPermit {
    static async spendRewardsOnIssuingBrand(reward: string, amount: number) : Promise<any> {
        return userContractWithoutPermit.populateTransaction["spendRewardsOnIssuingBrand"](
            reward,
            amount
        );
    }

    static async spendRewardsOnAnotherBrand(spendingInfo: SpendingInfo) : Promise<any> {
        return userContractWithoutPermit.populateTransaction["spendRewardsOnAnotherBrand"](
            spendingInfo
        );
    }
}

export class usersServiceWithPermit {
    static async spendRewardsOnIssuingBrandWithPermit(signer: Wallet | Signer, reward: string, amount: number | BigNumber) : Promise<any> {

        const permitParamsReward = await getPermitSignature(
            signer,
            rewardWithPermit(reward),   
            OPEN_REWARD_DIAMOND,
            amount,
            ethers.constants.MaxUint256
        );

        return userContractWithPermit.populateTransaction["spendRewardsOnIssuingBrandWithPermit"](
            reward,
            amount,
            {
                _deadline: ethers.constants.MaxUint256,
                _v: permitParamsReward.v,
                _r: permitParamsReward.r,
                _s: permitParamsReward.s
            }
        );
    }

    static async spendRewardsOnAnotherBrandWithPermit(spendingInfo: SpendingInfo, signer: Signer | Wallet) : Promise<any> {
        console.log("from.inner", spendingInfo)
        const permitParamsReward = await getPermitSignature(
            signer,
            rewardWithPermit(spendingInfo.rewardAtHand),   
            OPEN_REWARD_DIAMOND,
            spendingInfo.amountOfRewardAtHand,
            ethers.constants.MaxUint256
        );

        console.log("permit hash has been created", permitParamsReward);


        return userContractWithPermit.populateTransaction["spendRewardsOnAnotherBrandWithPermit"](
            spendingInfo,
            {
                _deadline: ethers.constants.MaxUint256,
                _v: permitParamsReward.v,
                _r: permitParamsReward.r,
                _s: permitParamsReward.s
            }
        );
    }

    static async getMeTokens(receiver: string, amount: BigNumber | number) : Promise<any> {
        return meToken.populateTransaction.mint(
            receiver,
            amount
        );
    }
}