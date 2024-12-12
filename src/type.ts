type NftData = {
  description: string;
  image: string;
  name: string;
  attributes: NftAttribute[];
};

type NftAttribute = {
  display_type: string;
  trait_type: string;
  value: string | number; // Allow both string and number for 'value'
};

// type ActionType = "LIST" | "UNLIST" | "TRANSFER" | "AUCTION";

type NftProps = {
  nft: NftData;
  isLoading: boolean;
  id: number;
  isTransfer: boolean;
  // isAuction: boolean;
  isList: boolean;
  // isUnList: boolean;
  price: number;
  // onAction?: (action: ActionType) => void;
  onPress?: ()=> void;
};

type ICOProps = {
  amount: number;

  // isUnList: boolean;
  price: number;
  // onAction?: (action: ActionType) => void;
};

interface ListedNFT {
  author: string; // Assuming 'author' is a string
  price: bigint; // Assuming 'price' is a bigint
  tokenId: number; // Assuming 'tokenId' is a bigint
  url: string
}

export { NftAttribute, NftProps, NftData, ListedNFT, ICOProps };
