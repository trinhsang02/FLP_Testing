import {
  Dimensions,
  View,
  Image,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import { NftProps } from "../../type";
import React, { useState } from "react";
import { HeartIcon as HeartIconOutline, ChevronDoubleRightIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import styles from "./styles";

const NFTCard: React.FC<NftProps> = ({
  nft,
  isLoading,
  id,
  price,
  isTransfer,
  isList,
  onPress,
}) => {
  const isShowDefaultImageBlueBird = id?.toString() === "1";
  const isShowDefaultImageRedBird = id?.toString() === "2";
  const isShowIPFSimage = id?.toString() === "0";

  const [isLiked, setIsLiked] = useState(false);

  const handleLikePress = (event) => {
    event.stopPropagation(); // Prevent navigation when click like button
    setIsLiked(!isLiked); 
  };

  return (
    <View style={styles.container}>
      {/* NFT CARD */}
      <TouchableOpacity onPress={onPress} style={styles.nft}>
        {!isLoading ? (
          <View style={styles.NFTCardContainer}>
            <View style={styles.imageContainer}>
              {isShowIPFSimage && (
                <Image
                  source={require("../../assets/images/yellowbird-midflap.png")}
                  style={[styles.nftImage, { aspectRatio: 1 }]}
                  resizeMode="contain"
                />
              )}
              {isShowDefaultImageBlueBird && (
                <Image
                  source={require("../../assets/images/bluebird-midflap.png")}
                  style={[styles.nftImage, { aspectRatio: 1 }]}
                  resizeMode="contain"
                />
              )}
              {isShowDefaultImageRedBird && (
                <Image
                  source={require("../../assets/images/redbird-midflap.png")}
                  style={[styles.nftImage, { aspectRatio: 1 }]}
                  resizeMode="contain"
                />
              )}
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.NFTName}>
                The Flappy Bird NFT #{(id as any)?.toString()}
              </Text>

              {isTransfer ? (
                <View style={styles.nftprice}>
                  <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                    <Text
                      style={styles.text}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {parseFloat((price as any)?.toString()) / 1e18} {" "}
                    </Text>
                    <Image
                      source={require('../../../src/assets/images/medal_gold.png')}
                      style={styles.iconCoin}
                    />
                  </View>
                </View>
              ) : (
                <View style={styles.nftprice}>
                  <ChevronDoubleRightIcon color="white" size={24} />
                </View>
              )}
            </View>
          </View>
        ) : (
          <ActivityIndicator size="large" style={styles.loadingIndicator} />
        )}
      </TouchableOpacity>

      {/* Like button */}
      <TouchableOpacity style={styles.likeButton} onPress={handleLikePress}>
        {isLiked ? (
          <HeartIcon color="red" size={24} />
        ) : (
          <HeartIconOutline color="orange" size={24} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default NFTCard;
