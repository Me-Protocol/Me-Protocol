import { brandService } from "../call";
import { magic } from "../lib/magic";
import { BrandDetailsProps, GetBrandDetailsProps } from "../lib/types";

export async function getBrandDetailsFN({
  email,
  getOnlyId = false,
  setLoading,
  setError,
}: GetBrandDetailsProps): Promise<
  { brandId: string } | Promise<{ brandDetails: BrandDetailsProps }> | undefined
> {
  setLoading(true);
  try {
    if (!(await magic.user.isLoggedIn())) {
      await magic.auth.loginWithEmailOTP({ email });
      const loggedInUserInfo = await magic.user.getInfo().then((info: any) => info);
      const brandDetails: BrandDetailsProps = await brandService.getBrandConfigByAddress(
        loggedInUserInfo.publicAddress
      );
      if (getOnlyId) {
        return { brandId: brandDetails.brandId };
      } else {
        return { brandDetails };
      }
    } else {
      const loggedInUserInfo = await magic.user.getInfo().then((info: any) => info);
      const brandDetails: BrandDetailsProps = await brandService.getBrandConfigByAddress(
        loggedInUserInfo.publicAddress
      );
      if (getOnlyId) {
        return { brandId: brandDetails.brandId };
      } else {
        return { brandDetails };
      }
    }
  } catch (error) {
    setError(error);
    throw error;
  } finally {
    setLoading(false);
  }
}
