import { View, Image, TouchableWithoutFeedback, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";

import LOGO from "../../../../assets/images/logo.png";
import PLAY from "../../../../assets/images/play.png";


import { styles } from "./styles";
import { useAccount, useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi-react-native";
import Button from "../../../../components/Button";
import { useStateContext } from "../../../../context";
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { SafeAreaView } from "react-native-safe-area-context";


const Start = ({ handleOnStart }) => {
  const { isConnected, address } = useAccount();
  const navigation = useNavigation<NavigationProp<any>>();

  const { open } = useWeb3Modal()
  const handleConnect = () => {
    open();
  }
  const [isLoading, setIsLoading] = useState(false);
  const { disconnect } = useDisconnect()
  const handleDisconnect = async () => {
    setIsLoading(true);
    try {
      await disconnect();
    }
    catch (e) {
    }
    setIsLoading(false);
  }




  return (
    <View style={styles.container}>
      {isLoading ? (
        <SafeAreaView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </SafeAreaView>

      ) : (
        <>
          <Image source={LOGO} style={styles.logo} />
          {isConnected ? (
            <>
              <TouchableOpacity onPress={handleOnStart}>
                <Image source={PLAY} style={styles.playButton} />
              </TouchableOpacity>
              <Button text="Disconnect" onPress={handleDisconnect} />
              <Button text="Market Place" onPress={() => navigation.navigate('StoreTab')} />
            </>
          ) : (
            <Button text="Connect Wallet" onPress={handleConnect} />
          )}
        </>
      )}
    </View>
  );
};

export { Start };