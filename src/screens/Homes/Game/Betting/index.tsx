import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import styles from "./style";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { useStateContext } from "../../../../context";
import { ImageBackground } from 'react-native';
import {
  getBirdMarketPlaceAddress,
  getFLPCrowdSaleAddress,
  getFloppyAddress,
} from "../../../../contracts/utils/getAddress";
import {
  getFLPCrowdSaleABI,
  getFloppyAbi,
} from "../../../../contracts/utils/getAbis";
import { parseEther } from "../../../../contracts/utils/parseEther";
import { ArrowPathIcon, InformationCircleIcon } from 'react-native-heroicons/outline'
import Header from "../../../../components/Header";
import { use } from "matter-js";

const Betting = ({  handleOnBet, handleSkipBet  }) => {
  const { address } = useStateContext();

  const floppyAddress = getFloppyAddress();
  const marketPlaceAddress = getBirdMarketPlaceAddress();
  const flpCrowdSaleAddress = getFLPCrowdSaleAddress();
  const floppyABI = getFloppyAbi();
  const flpCrowdSaleABI = getFLPCrowdSaleABI();

  const navigation = useNavigation();
  const [coins, setCoins] = useState({ coin1: "RON", coin2: "FLP" });
  const [coinLogo, setCoinLogo] = useState({
    // coin1: require("../../assets/images/ronin_logo.png"),
    coin2: require("../../../../assets/images/medal_gold.png"),
  });


  const [coinAmount1, setCoinAmount1] = useState("0.0");
  const [approvedAmount, setApprovedAmount] = useState(0);
  const [txLoading, setTxLoading] = useState(false);

  //prepare config
  const {
    config: approveTokenConfig,
    isSuccess: isPrepareApproveTokenSuccess,
  } = usePrepareContractWrite({
    address: floppyAddress,
    abi: floppyABI,
    functionName: "approve",
    args: [flpCrowdSaleAddress, Number(Number(coinAmount1) * 1e18)],
  });

  // contract write
  const { writeAsync: onApprove } = useContractWrite(approveTokenConfig);

  //contract read
  const { data: userTokenBalance } = useContractRead({
    address: floppyAddress as any,
    abi: floppyABI,
    functionName: "balanceOf",
    args: [address],
    enabled: true,
    watch: true,
  });

  const [balance, setBalance] = useState({
    coin2: parseFloat((userTokenBalance as any)?.toString()) / 1e18,
  });

  const [approved, setApproved] = useState(false);

  const { data: approvedAddress } = useContractRead({

  });

  const [selectedTier, setSelectedTier] = useState<number | null>(null); //State for checkbox

  const onClickApprove = async () => {
    try {
      console.log(
        "Approving spending cap ....",
        Number(Number(coinAmount1) * 1e18)
      );
      setTxLoading(true);
      const txHash = (await onApprove?.()).hash;
      console.log(txHash);
      setTxLoading(false);
    } catch (error) { }
  };

  const onClickSkip = async () => {
    try {
       handleSkipBet();
       
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = async (action: string) => {
    if (action === "Approve") {
      await onClickApprove();
    } else if (action === "Skip") {
      await onClickSkip();
    }
  };
  const buttonStyle = () => {
    if (txLoading) return styles.disabledButton;
    else return styles.button;
  };

  const buttonText = () => {
    if (txLoading && approvedAddress?.toString().toLowerCase() != marketPlaceAddress) return "Approving...";
    else if (approvedAddress?.toString().toLowerCase() != marketPlaceAddress) return "Approve";
    else if (txLoading && approvedAddress?.toString().toLowerCase() == marketPlaceAddress) return "Challenging..."
    else return "Challenge Now";
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ImageBackground
        source={require('../../../../assets/images/Background_Store.png')}
        style={{ flex: 1 }}
      >
        <Header address={address} screenName="Betting" />

        {/* Container */}
        <View style={styles.container}>
          <View style={styles.rectangle}>

            <View style={styles.coinContainer}>
              <Text style={styles.header}>{"Enter Amount:"}</Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="0.0"
                  keyboardType="numeric"
                  onFocus={() => {
                    setCoinAmount1("");
                  }}
                  editable={true}
                />
                <View style={styles.coinWrapper}>
                  <Image source={coinLogo.coin2} style={styles.icon} />
                  <Text style={styles.coin}>{coins.coin2}</Text>
                </View>
              </View>
              <Text style={styles.balance}>Balance: {balance.coin2}</Text>

              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.header}>Tiers: </Text>
                <Text style={styles.header}>Reward: </Text>
              </View>

              {/* Select tiers for betting */}
              <View style={{ marginRight: 40 }}>
                <TouchableOpacity >
                  {[
                    { tier: "Bronze: 30 - 50", reward: "15%" },
                    { tier: "Silver: 50 - 70", reward: "35%" },
                    { tier: "Gold: 70 - 100", reward: "50%" },
                    { tier: "Diamond: 100+", reward: "85%" },].map((item, index) => (
                      <View
                        key={index}
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <BouncyCheckbox
                          isChecked={selectedTier === index}
                          key={index}
                          size={20}
                          fillColor="black"
                          unFillColor="#FFFFFF"
                          text={item.tier}
                          textStyle={{
                            textDecorationLine: "none",
                            fontSize: 16,
                            color: "black",
                          }}
                          innerIconStyle={{ borderWidth: 2 }}
                          onPress={() => setSelectedTier(index)}
                        />
                        <Text
                          style={{
                            paddingRight: 50,
                            color: "black",
                            fontSize: 14,
                          }}
                        >
                          {item.reward}
                        </Text>
                      </View>
                    ))}
                </TouchableOpacity>
              </View>

            </View>
          </View>


          {/* Approve Notification */}
          {approvedAddress?.toString().toLowerCase() != marketPlaceAddress ? (
            <View style={styles.approvecontainer}>
              <InformationCircleIcon color={"black"} />
              <View >
                <Text style={styles.approveText} >
                  Approve transfering
                </Text>
                <Text
                  style={{
                    color: "black",
                    fontSize: 15,
                    textAlign: "left",
                    fontWeight: "200"
                  }}
                >
                  This transaction cannot be done. Please approve it first.
                </Text>
              </View>
            </View>
          ) : null}


          {/* Approve button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={buttonStyle()}
              onPress={() => handleButtonClick("Approve")}
              disabled={txLoading}
            >
              <Text style={styles.buttonText}>{buttonText()}</Text>
            </TouchableOpacity>

            {/* Skip button */}
            <TouchableOpacity style={styles.button}
              onPress={() => handleButtonClick("Skip")}
            >
              <Text style={styles.buttonText}>Skip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>

  );
};

export { Betting };
