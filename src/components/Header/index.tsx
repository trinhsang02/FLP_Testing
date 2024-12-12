import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { UserCircleIcon, ArrowLeftCircleIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
    Owns: undefined;
    // Add other screens here as needed
};

interface HeaderData {
    address: string;
    screenName: string;
}

interface HeaderData {
    address: string;
    screenName: string;
}

const Header: React.FC<HeaderData> = ({ address, screenName }) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const shortenAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const getScreenDescription = (screenName: string) => {
        switch (screenName) {
            case 'Swap':
                return ' Swap your coins ';
            case 'Store':
                return ' NFT Collection ';
            case 'Owns':
                return ' Your NFT ';
            case 'Betting':
                return ' Challenge Mode ';
            default:
                return ' Welcome ';
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.blockHeaderBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowLeftCircleIcon color='black' size="30" />
                </TouchableOpacity>
                <Text style={styles.Address}>{shortenAddress(address)}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Owns')}>
                    <UserCircleIcon color='black' size="40" />
                </TouchableOpacity>
            </View>
            <View style={styles.screenDescription}>
                {screenName === 'Betting' && (
                    <Image
                        source={require('../../../src/assets/images/fire.png')}
                        style={{ width: 10, height: 17 }}
                    />
                )}
                <Text style={[styles.description]}>
                    {getScreenDescription(screenName)}
                </Text>
                {screenName === 'Betting' && (
                    <Image
                        source={require('../../../src/assets/images/fire.png')}
                        style={{ width: 10, height: 17 }}
                    />
                )}
            </View>
        </View>
    );
};

export default Header;
