import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  InputAccessoryView,
  Button,
  Platform,
} from "react-native"; // Import Image from react-native
import { useNavigation } from "@react-navigation/native";
import Picker from "react-native-picker-select";

import styles from "./style";
import {
  useBalance,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { useStateContext } from "../../context";
import { ImageBackground } from 'react-native';
import {
  getBirdMarketPlaceAddress,
  getFLPCrowdSaleAddress,
  getFloppyAddress,
} from "../../contracts/utils/getAddress";
import {
  getFLPCrowdSaleABI,
  getFloppyAbi,
} from "../../contracts/utils/getAbis";
import { parseEther } from "../../contracts/utils/parseEther";
import { ArrowPathIcon, InformationCircleIcon } from 'react-native-heroicons/outline'
import Header from "../../components/Header";

const Swap = () => {
  const { address } = useStateContext();

  const floppyAddress = getFloppyAddress();
  const marketPlaceAddress = getBirdMarketPlaceAddress();
  const flpCrowdSaleAddress = getFLPCrowdSaleAddress();
  const floppyABI = getFloppyAbi();
  const flpCrowdSaleABI = getFLPCrowdSaleABI();

  const navigation = useNavigation();
  const [coins, setCoins] = useState({ coin1: "RON", coin2: "FLP" });
  const [coinLogo, setCoinLogo] = useState({
    coin1: require("../../assets/images/ronin_logo.png"),
    coin2: require("../../assets/images/medal_gold.png"),
  });
  const swapCoins = () => {
    setCoins({ coin1: coins.coin2, coin2: coins.coin1 });
    setCoinLogo({ coin1: coinLogo.coin2, coin2: coinLogo.coin1 });
    setBalance({ coin1: balance.coin2, coin2: balance.coin1 });
    setRates(1 / rates);
  };

  const defaultRate = 1000;
  const [coinAmount1, setCoinAmount1] = useState("0.0");
  const [coinAmount2, setCoinAmount2] = useState("0.0");
  const [approvedAmount, setApprovedAmount] = useState(0);
  const [rates, setRates] = useState(1000);
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

  const { config: buyRONconfig, isSuccess: isPrepareBuyRONSuccess } =
    usePrepareContractWrite({
      address: flpCrowdSaleAddress,
      abi: flpCrowdSaleABI,
      functionName: "buyRONbyToken",
      args: [Number(Number(coinAmount1) * 1e15)],
    });

  const { config: buyTokenConfig, isSuccess: isPrepareBuyTokenSuccess } =
    usePrepareContractWrite({
      address: flpCrowdSaleAddress,
      abi: flpCrowdSaleABI,
      functionName: "buyTokenByRON",
      args: [],
      value: BigInt(Number(coinAmount1)) * BigInt(1e18),
    });

  // contract write
  const { writeAsync: onApprove } = useContractWrite(approveTokenConfig);

  const { writeAsync: onBuyRonByFLP } = useContractWrite(buyRONconfig);

  const { writeAsync: onBuyTokenByRON } = useContractWrite(buyTokenConfig);

  //contract read
  const { data: ronBalance } = useBalance({
    address: address,
    watch: true,
  });
  const { data: userTokenBalance } = useContractRead({
    address: floppyAddress as any, // Bird address
    abi: floppyABI,
    functionName: "balanceOf",
    args: [address],
    enabled: true,
    watch: true,
  });

  const { data: amount, isSuccess: isCheckAmountAprrovedSuccess } =
    useContractRead({
      address: floppyAddress as any,
      abi: floppyABI,
      functionName: "allowance",
      args: [address, flpCrowdSaleAddress],
      watch: true,
      onSuccess(data) {
        setApprovedAmount(amount as number);
      },
    });

  const [balance, setBalance] = useState({
    coin1: parseFloat((ronBalance?.value as any)?.toString()) / 1e18,
    coin2: parseFloat((userTokenBalance as any)?.toString()) / 1e18,
  });

  const [approved, setApproved] = useState(false);

  const buttonText = () => {
    if (Number(coinAmount1) === 0) {
      return "Enter an amount";
    } else if (Number(coinAmount1) > Number(balance.coin1)) {
      return "Insufficient " + coins.coin1 + " Balance to swap";
    } else if (
      coins.coin1 === "FLP" &&
      parseFloat((approvedAmount as any)?.toString()) / 1e18 <
      Number(coinAmount1)
    ) {
      return txLoading ? "Approving..." : "Approve spending cap";
    } else {
      return txLoading ? "Swapping..." : "Swap";
    }
  };

  const checkDisabled = () => {
    if (txLoading) return true;

    if (Number(coinAmount1) === 0) {
      return true;
    } else if (Number(coinAmount1) > Number(balance.coin1)) {
      return true;
    } else if (
      coins.coin1 === "FLP" &&
      parseFloat((approvedAmount as any)?.toString()) / 1e18 >
      Number(coinAmount1)
    ) {
      return false;
    } else {
      return false;
    }
  };

  const buttonStyle = () => {
    const disable = checkDisabled();
    if (txLoading) return styles.buttonLoading;

    if (Number(coinAmount1) > Number(balance.coin1)) return styles.buttonError;

    if (disable) return styles.buttonDisabled;

    return styles.buttonEnabled;
  };

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
  const onClickBuyRon = async () => {
    try {
      console.log("Buying RON ....", Number(Number(coinAmount1) * 1e18));
      setTxLoading(true);
      const txHash = (await onBuyRonByFLP?.()).hash;
      console.log(txHash);
      setTxLoading(false);
    } catch (error) { }
  };

  const onClickBuyToken = async () => {
    try {
      console.log("Buying token...");
      setTxLoading(true);
      const txHash = (await onBuyTokenByRON?.()).hash;
      console.log(txHash);
      setTxLoading(false);
    } catch (error) { }
  };

  const handleButtonClick = async () => {
    if (Number(coinAmount1) === 0) {
    } else if (Number(coinAmount1) > Number(balance.coin1)) {
    } else if (coins.coin1 === "FLP") {
      if (
        coins.coin1 === "FLP" &&
        parseFloat((approvedAmount as any)?.toString()) / 1e18 <
        Number(coinAmount1)
      ) {
        onClickApprove();
      } else {
        onClickBuyRon();
      }
    } else if (coins.coin1 === "RON") {
      onClickBuyToken();
    }
  };

  React.useEffect(() => {
    // setCoins({ coin1: coins.coin1, coin2: coins.coin2 });
    // setCoinLogo({ coin1: coinLogo.coin1, coin2: coinLogo.coin2 });
    if (coins.coin1 === "RON") {
      setBalance({
        coin1: parseEther(ronBalance?.value as any),
        coin2: parseEther(userTokenBalance as any),
      });
    } else {
      setBalance({
        coin1: parseEther(userTokenBalance as any),
        coin2: parseEther(ronBalance?.value as any),
      });
    }
  }, [ronBalance, userTokenBalance]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ImageBackground
          source={require('../../assets/images/Background_Store.png')}
          style={{ flex: 1 }}
        >
          <Header address={address} screenName="Swap" />
          {/* Container tổng */}
          <View
            style={[
              styles.container,
              parseEther(approvedAmount) < Number(coinAmount1) && coins.coin1 === "FLP"
                ? { flex: 1 }
                : { flex: 3 },
            ]}
          >
            <View style={styles.rectangle}>
              <View style={styles.coinContainer}>
                <Text style={styles.header}>{"You sell :"}</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={styles.coinWrapper}>
                    <Image source={coinLogo.coin1} style={styles.icon} />
                    <Text style={styles.coin}>{coins.coin1}</Text>
                  </View>
                </View>
                <Text style={styles.balance}>Balance: {balance.coin1}</Text>
              </View>
              <TextInput
                style={
                  Number(coinAmount1) > Number(balance.coin1)
                    ? styles.textInputError
                    : styles.textInput
                }
                onChangeText={(text) => {
                  setCoinAmount1(text);
                }}
                value={coinAmount1}
                keyboardType="numeric"
                onFocus={() => {
                  setCoinAmount1("");
                }}
                placeholder="0.0"
              />
            </View>

            <TouchableOpacity onPress={() => swapCoins()}>
              <ArrowPathIcon color="white" size="50" />
            </TouchableOpacity>

            <View style={styles.rectangle}>
              <View style={styles.coinContainer}>
                <Text style={styles.header}>{"You buy :"}</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={styles.coinWrapper}>
                    <Image source={coinLogo.coin2} style={styles.icon} />
                    <Text style={styles.coin}>{coins.coin2}</Text>
                  </View>
                </View>
                <Text style={styles.balance}>Balance: {balance.coin2}</Text>
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="0.0"
                value={(Number(coinAmount1) * rates).toString()}
                keyboardType="numeric"
                onFocus={() => {
                  setCoinAmount2("");
                }}
                editable={false}
              />
            </View>

            <View style={styles.rectangle}>
              <Text style={styles.rate}>
                {coins.coin1 === "RON" && coins.coin2 === "FLP"
                  ? `1 RON = ${defaultRate} FLP`
                  : `1 FLP = ${1 / defaultRate} RON`}
              </Text>
            </View>

            {parseEther(approvedAmount) < Number(coinAmount1) &&
              coins.coin1 === "FLP" &&
              Number(coinAmount1) <= Number(balance.coin1) ? (
              <View style={styles.approvecontainer}>
                <InformationCircleIcon color="black" />
                <View style={{ flexDirection: "column", marginLeft: 10 }}>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 15,
                      textAlign: "left",
                      marginBottom: 10,
                      fontWeight: "600",
                    }}
                  >
                    Approve spending cap
                  </Text>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 15,
                      textAlign: "left",
                      fontWeight: "200",
                    }}
                  >
                    Your current spending cap is {parseEther(approvedAmount)} FLP.
                    Please approve new spending cap
                  </Text>
                </View>
              </View>
            ) : null}

            <TouchableOpacity
              style={buttonStyle()}
              disabled={checkDisabled()}
              onPress={() => handleButtonClick()}
            >
              <Text style={styles.buttonText}>{buttonText()}</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  );
};

export default Swap;
