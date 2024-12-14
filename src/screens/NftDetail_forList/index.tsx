import React, { useState } from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { ListedNFT, NftData } from "../../type";
import {
  getBirdAbi,
  getBirdMarketPlaceAbi,
  getFloppyAbi,
} from "../../contracts/utils/getAbis";
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

import {
  getBirdAddress,
  getBirdMarketPlaceAddress,
  getFloppyAddress,
} from "../../contracts/utils/getAddress";
// import { WriteContract } from '../../components/WriteContract';
import { InformationCircleIcon } from "react-native-heroicons/outline";


import { bscTestnet } from "wagmi/chains";
import NFTCard from "../../components/NFTCard";
import ICOCard from "../../components/ICOCard";
import { WriteContract } from "../../components/WriteContract";
import Button from "../../components/Button";
import { useStateContext } from "../../context";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { State, actionCreators } from "../../redux";
import { useSelector } from "react-redux";
import { ImageBackground } from 'react-native';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { toGwei } from "../../contracts/utils/parseEther";
import { changeBirdColor } from "../../redux/action-creators";
import { Alert } from "react-native";
import Header from "../../components/Header";
import styles from "./styles";

const NFTDetailList = ({ route }) => {
  const navigation = useNavigation();
  const [nftPrice, setNftPrice] = useState("");
  const id = route?.params.data?.tokenId;
  const nft = route?.params.data?.tokenUrl?._j;

  const isShowDefaultImageBlueBird = id?.toString() === "1";
  const isShowDefaultImageRedBird = id?.toString() === "2";
  const isShowIPFSimage = id?.toString() === "0";


  const { address } = useAccount();
  const { fetchListedNfts, fetchUserNfts } = useStateContext();
  const [txLoading, setTxLoading] = useState(false);

  const dispatch = useDispatch();
  const { approveNft, approveToken } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const state = useSelector((state: State) => state.approve);
  //
  const handleBirdColorChange = () => {
    let color = "default";
    if (isShowDefaultImageBlueBird) color = "blue";
    if (isShowDefaultImageRedBird) color = "red";
    if (isShowIPFSimage) color = "yellow";

    dispatch(changeBirdColor(color) as any);
    Alert.alert(
      "Bird Color Changed",
      "Your bird skin has been changed to this NFT",
      [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
        },
      ]
    )
  }

  //contracts address, abi
  const marketPlaceAddress = getBirdMarketPlaceAddress();
  const birdAddress = getBirdAddress();
  const birdAbi = getBirdAbi();
  const floppyAddress = getFloppyAddress();
  const floppyABI = getFloppyAbi();
  const birdMarketPlaceABI = getBirdMarketPlaceAbi();
  // Prepare contract configurations
  const { config: approveNftConfig, isSuccess: isPrepareApproveNftSuccess } =
    usePrepareContractWrite({
      address: birdAddress,
      abi: birdAbi,
      functionName: "approve",
      args: [marketPlaceAddress, id?.toString()],
    });
  const { config: listNftConfig, isSuccess: isPrepareListNftSuccess } =
    usePrepareContractWrite({
      address: marketPlaceAddress,
      abi: birdMarketPlaceABI,
      functionName: "listNft",
      args: [id?.toString(), toGwei(nftPrice)],
    });
  // Hook contract functions

  const {
    isSuccess: isApproveNftSuccess,
    isError: buyApproveNftError,
    writeAsync: onApproveNft,
    isError: isApproveNftError,
    isLoading: isApproveNftLoading,
  } = useContractWrite(approveNftConfig);
  const {
    data: listData,
    isSuccess: isListNftSuccess,
    isError: isListNftError,
    isLoading: isListNftLoading,
    writeAsync: onListNFT,
  } = useContractWrite(listNftConfig);

  // Hook read contract

  const { data: approvedAddress } = useContractRead({
    address: birdAddress as any,
    abi: birdAbi,
    functionName: "getApproved",
    args: [id?.toString()],
    watch: true,
  });

  const buttonStyle = () => {
    if (txLoading) return styles.disabledButton;
    else return styles.button;
  };

  const buttonText = () => {
    if (txLoading && approvedAddress?.toString().toLowerCase() != marketPlaceAddress) return "Approving...";
    else if (approvedAddress?.toString().toLowerCase() != marketPlaceAddress) return "Approve";
    else if (txLoading && approvedAddress?.toString().toLowerCase() == marketPlaceAddress) return "Listing..."
    else return "List Now";
  };

  //handle NFT actions
  const handleListNFT = async () => {
    console.log("List NFT id:", id);
    if (approvedAddress?.toString().toLowerCase() != marketPlaceAddress) {
      console.log("Please approve market to transfer this NFT");
      try {
        setTxLoading(true);
        const txHash = (await onApproveNft?.()).hash;
        console.log(txHash);
        setTxLoading(false);
      } catch (error) { }
    } else {
      console.log("Listing NFT......");
      try {
        setTxLoading(true);
        const txHash = (await onListNFT?.()).hash;
        console.log(txHash);
        setTxLoading(false);
        if (txHash.toString().length > 0) {
          navigation.goBack();
        }
      } catch (error) { }
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
            {/* <TouchableOpacity style={styles.containerPrice}> */}
              <TextInput
                style={styles.text}
                numberOfLines={1}
                placeholder="0.0"
                keyboardType="numeric"
                value={nftPrice}
                onChangeText={(text) => {
                  if (parseFloat(text) <= 0) {
                    Alert.alert("Error", "Please enter a positive integer.", [{text: 'OK', style: 'default'}]);
                  } else {
                    setNftPrice(text);
                  }
                }}
                maxLength={10}
                editable={approvedAddress?.toString().toLowerCase() == marketPlaceAddress}
              />
            {/* </TouchableOpacity> */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../../../src/assets/images/medal_gold.png")}
                  style={styles.iconCoin}
                />
                <Text >{" "}FLP</Text>
              </View>
          </View>

        </View>
        {/* <Text style={styles.title}> The Flappy Bird NFT #{id.toString()} </Text> */}
        {approvedAddress?.toString().toLowerCase() != marketPlaceAddress ? (
          <View style={styles.approvecontainer}>
            <InformationCircleIcon color={"black"}/>
            <View style={{
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
                Approve transfering the NFT
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 15,
                  textAlign: "left",
                  fontWeight: "200"
                }}
              >
                This NFT cannot be listed for transfer on the market yet. Please approve it first.
              </Text>
            </View>
          </View>
        ) : null}
        {/* select skin button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}
            onPress={() => handleBirdColorChange()}
          >
            <Text style={styles.buttonText}>Select</Text>
          </TouchableOpacity>


          {/* Button to list now */}
          <TouchableOpacity
            style={buttonStyle()}
            onPress={() => handleListNFT()}
            disabled={txLoading}
          >
            <Text style={styles.buttonText}>{buttonText()}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};


export default NFTDetailList;
