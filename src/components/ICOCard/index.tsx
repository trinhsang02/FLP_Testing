import { Dimensions, View, StyleSheet, Image, ActivityIndicator, Text, Button } from "react-native";
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";
import { getBirdAbi, getBirdMarketPlaceAbi, getFloppyAbi } from "../../contracts/utils/getAbis";
// import { NftProps } from "../../../type";
import React from "react";
import RequestModal from "../RequestModal";
import { config } from "dotenv";
import { getBirdAddress, getBirdMarketPlaceAddress, getFloppyAddress } from "../../contracts/utils/getAddress";
import { ICOProps } from "../../type";
import COIN from "../../assets/images/medal_gold.png";


const width = Dimensions.get('window').width;

const ICOCard: React.FC<ICOProps> = ({ amount, price }) => {

    return (
        <View style={styles.nft}>
            {
                <Image source={COIN}
                    style={[styles.nftImage, { aspectRatio: 1 }]}
                    resizeMode="contain"
                />
            }
            {
                <Text style={styles.nftprice}>
                    AMOUNT FLP: {amount}
                </Text>
            }
            {

                <View style={styles.buyButton}>
                    <Button title={`${price} BNB`} onPress={() => { }} />
                </View>
            }

        </View >

    )
}

const styles = StyleSheet.create({

    nft: {
        backgroundColor: "#eee",
        width: width * 0.45,
        marginHorizontal: 10,
        borderRadius: 8,
        justifyContent: 'center'
    }, nftprice: {
        backgroundColor: "#eee",
        width: width * 0.45
    },
    nftImage: {
        width: "100%",
        height: undefined,
        marginBottom: 10,
        borderRadius: 6,
    },
    loadingIndicator: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ADD8E6', // Light blue color,
    },
    buyButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    }

})

export default ICOCard