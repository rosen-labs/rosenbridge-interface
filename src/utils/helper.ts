import TokenImageURI from "../datasources/tokenImageURI.json";
import { WalletInfo, WalletType } from "../types/wallet";

export const formatWalletAddress = (walletInfo: WalletInfo | null): string => {
  if (!walletInfo) return "";

  if (walletInfo.type === WalletType.KEPLR) {
    const length = walletInfo.address.length;
    return (
      walletInfo.address.substr(0, 13) +
      "..." +
      walletInfo.address.substr(length - 6, 6)
    );
  }
  return walletInfo.address;
};

export const getTokenLogoURL = (address: string): string => {
  const mapper = TokenImageURI as { [key: string]: string };
  const imageURL = mapper[address];

  if (imageURL) return imageURL;

  return `https://via.placeholder.com/30`;
};
