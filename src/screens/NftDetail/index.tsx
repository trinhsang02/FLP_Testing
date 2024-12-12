import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,


} from "react-native";
import { NftProps } from "../../type";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from 'react-native';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { State, actionCreators } from "../../redux";
import {
  getBirdAddress,
  getBirdMarketPlaceAddress,
  getFloppyAddress,
} from "../../contracts/utils/getAddress";
import {
  getBirdAbi,
  getBirdMarketPlaceAbi,
  getFloppyAbi,
} from "../../contracts/utils/getAbis";
import { useStateContext } from "../../context";
import { parseEther } from "../../contracts/utils/parseEther";
import Header from "../../components/Header";
import NFTCard from "../../components/NFTCard";
import { InformationCircleIcon } from "react-native-heroicons/outline";
import styles from "./style";



const NFTDetail = ({ route }) => {
  const navigation = useNavigation();
  // const [textWidth, setTextWidth] = useState(0);
  // const handleTextLayout = (event: any) => {
  //   const { width } = event.nativeEvent.layout;
  //   setTextWidth(width); //Get the width of the text and update it to the state
  // };




  const nft = route?.params.data?._j;
  const id = route?.params.id;
  const price = route?.params.price;
  const nftPrice = price?.toString() as any as number;

  const handlePlaceBid = () => {
    console.log("Place Bid Now button pressed");
  };

  const handleFavorite = () => {
    console.log("Favorite button pressed");
  };
  const handleShare = () => {
    console.log("Share button pressed");
  };
  const handleAdd = () => {
    console.log("Add button pressed");
  };

  const { address } = useAccount();
  const { fetchListedNfts, fetchUserNfts } = useStateContext();
  const [requestModalVisible, setRequetsModalVisible] = React.useState(false);
  const [isRequestLoading, setRequestLoading] = React.useState(false);
  const [isRequestSuccess, setRequestSisRequestSuccess] = React.useState(false);
  const [isRequestError, setRequestSisRequestError] = React.useState(false);

  const dispatch = useDispatch();
  const { approveNft, approveToken } = bindActionCreators(
    actionCreators,
    dispatch
  );



  const state = useSelector((state: State) => state.approve);
  //contracts address, abi
  const marketPlaceAddress = getBirdMarketPlaceAddress();
  const birdAddress = getBirdAddress();
  const birdAbi = getBirdAbi();
  const floppyAddress = getFloppyAddress();
  const floppyABI = getFloppyAbi();
  const birdMarketPlaceABI = getBirdMarketPlaceAbi();

  const isShowDefaultImageBlueBird = id?.toString() === "1";
  const isShowDefaultImageRedBird = id?.toString() === "2";
  const isShowIPFSimage = id?.toString() === "0";

  const [txLoading, setTxLoading] = useState(false);

  const buttonText = () => {
    const amount = amountApproved?.toString() as any as number;
    if (txLoading && amount >= nftPrice) return "Buying...";
    else if (amount >= nftPrice) return "Buy";
    else if (txLoading && amount < nftPrice) return "Approving...";
    else return "Approve";
  };
  const buttonStyle = () => {
    if (txLoading) return styles.disabledButton;
    else return styles.button;
  };

  // Prepare contract configurations
  const { config: buyNftConfig, isSuccess: isPrepareBuyNftSuccess } =
    usePrepareContractWrite({
      address: marketPlaceAddress,
      abi: birdMarketPlaceABI,
      functionName: "buyNFT",
      args: [id?.toString()],
    });
  const {
    config: approveTokenConfig,
    isSuccess: isPrepareApproveTokenSuccess,
  } = usePrepareContractWrite({
    address: floppyAddress,
    abi: floppyABI,
    functionName: "approve",
    args: [marketPlaceAddress, price],
  });

  // Hook contract functions

  const {
    isLoading: isApproveTokenLoading,
    isSuccess: isApproveTokenSuccess,
    isError: isApproveTokenError,
    writeAsync: onApprove,
  } = useContractWrite(approveTokenConfig);
  const {
    isSuccess: isBuyNftSuccess,
    isError: isBuyNftError,
    isLoading: isBuyNftLoading,
    writeAsync: onBuyNFT,
  } = useContractWrite(buyNftConfig);

  // Hook read contract
  const { data: amountApproved, isSuccess: isCheckAmountAprrovedSuccess } =
    useContractRead({
      address: floppyAddress as any,
      abi: floppyABI,
      functionName: "allowance",
      args: [address, marketPlaceAddress],
      watch: true,
      onSuccess(data) {
        approveToken(amountApproved as number);
      },
    });

  const { data: userFlpBalance } = useContractRead({
    address: floppyAddress as any,
    abi: floppyABI,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });

  //handle NFT actions
  const handleBuyNFT = async () => {
    console.log("Buy NFT button pressed");
    if (isCheckAmountAprrovedSuccess) {
      const amount = amountApproved?.toString() as any as number;
      console.log(amount);
      try {
        if (amount >= nftPrice) {
          console.log("Buying...");
          if (isPrepareBuyNftSuccess) {
            setTxLoading(true);
            const txHash = (await onBuyNFT?.()).hash;
            console.log(txHash);
            setTxLoading(false);
            if (txHash.toString().length > 0) {
              navigation.goBack();
            }
          }
        } else {
          // setRequetsModalVisible(true);
          console.log("Approving...");
          if (isPrepareApproveTokenSuccess) {
            setTxLoading(true);
            const txHash = (await onApprove?.()).hash;
            console.log(txHash);
            setTxLoading(false);
          }
        }
      } catch (error) {
      }
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/Background_Store.png')}
      style={{ flex: 1 }}
    >
      <Header address={address} screenName="Store" />
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            {isShowDefaultImageBlueBird && (
              <Image
                source={require("../../assets/images/bluebird-midflap.png")}
                style={styles.overlayImage}
              />
            )}
            {isShowDefaultImageRedBird && (
              <Image
                source={require("../../assets/images/redbird-midflap.png")}
                style={styles.overlayImage}
              />
            )}
            {isShowIPFSimage && (
              <Image
                source={require("../../assets/images/yellowbird-midflap.png")}
                style={styles.overlayImage}
              />
            )}
          </View>
          <View style={styles.nftInfo}>
              <Text style={styles.title}>
                {" "}
                The Flappy Bird NFT #{(id as any)?.toString()}{" "}
              </Text>

              <View style={styles.containerPrice}>
                <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
                  {parseFloat((price as any)?.toString()) / 1e18} {" "}
                </Text>
                <Image
                  source={require("../../../src/assets/images/medal_gold.png")}
                  style={styles.iconCoin}
                />
              </View>
            </View>
        </View>


        {(amountApproved?.toString() as any as number) < nftPrice &&
          parseEther(userFlpBalance?.toString()) > parseEther(nftPrice) ? (
          <View style={styles.approvecontainer}>
            <InformationCircleIcon color='black' />
            <View
              style={{
                flexDirection: "column",
                marginLeft: 10,
              }}>
              <Text
                style={{
                  color: "black",
                  fontSize: 15,
                  textAlign: "left",
                  marginBottom: 10,
                  fontWeight: "600"
                }}
              >
                Approve spending cap
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 15,
                  textAlign: "left",
                  fontWeight: "200"
                }}
              >
                Your current spending cap is {parseEther(amountApproved)} FLP.
                Please approve new spending cap
              </Text>
            </View>
          </View>
        ) : null}
        {/* Button Place Bid Now*/}

        <View style={styles.footer}>
          {parseEther(userFlpBalance?.toString()) > parseEther(nftPrice) ? (
            <TouchableOpacity
              style={buttonStyle()}
              onPress={() => handleBuyNFT()}
              disabled={txLoading}
            >
              <Text style={styles.buttonText}>{buttonText()}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.buttonError} disabled={true}>
              <Text style={styles.buttonText}>Insufficient balance</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};


export default NFTDetail;

function setSelectedSkin(skin: any) {
  throw new Error("Function not implemented.");
}

