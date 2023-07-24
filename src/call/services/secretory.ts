import { BigNumber } from "ethers";
import { secretoryContract } from "../contracts";








export class secretoryService {
    static async getAmountIn(inputReward: string, outputReward: string, amountOut: number | BigNumber) : Promise<any> {
        console.log("from inner", inputReward, outputReward, amountOut);
        
        return await secretoryContract["getAmountIn"](
            inputReward,
            outputReward,
            amountOut
        );
    }
}

//getAmountIn(address, address, uint256)