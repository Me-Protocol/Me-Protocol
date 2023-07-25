import { ethers } from "ethers";
import { secretoryService } from "../call/services/secretory";
import { GetExpectedAmountOfTargetedRewardProps } from "../lib/types";

export async function getExpectedAmountOfTargetedRewardFN({
  inputRewardAddress,
  outPutRewardAddress,
  amount,
  setLoading,
  returnAsFormatted,
}: GetExpectedAmountOfTargetedRewardProps) {
  setLoading(true);

  try {
    const neededAmount = await secretoryService.getAmountIn(
      inputRewardAddress.trim(),
      outPutRewardAddress.trim(),
      ethers.utils.parseEther(parseFloat(amount).toString())
    );

    if (returnAsFormatted) {
      return ethers.utils.formatUnits(neededAmount, 18);
    } else {
      return neededAmount;
    }
  } catch (error) {
    throw error;
  } finally {
    setLoading(false);
  }
}
