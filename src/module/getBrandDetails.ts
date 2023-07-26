import { brandService } from "../call";
import { magic } from "../lib/magic";
import { BrandDetailsProps, GetBrandDetailsProps } from "../lib/types";

export async function getBrandDetailsFN({
  brandEmail,
  getOnlyId = false,
  setLoading,
}: GetBrandDetailsProps): Promise<
  { brandId: string } | Promise<{ brandDetails: BrandDetailsProps }> | undefined
> {
  setLoading(true);
  try {
    if (!(await magic.user.isLoggedIn())) {
      await magic.auth.loginWithbrandEmailOTP({ brandEmail: brandEmail });
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
    throw error;
  } finally {
    setLoading(false);
  }
}
