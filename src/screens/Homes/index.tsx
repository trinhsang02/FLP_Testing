import { ImageBackground, Text, View } from "react-native";
import React from "react";

import BACKGROUND from "../../assets/images/background.png";

import { styles } from "./styles";
import Game from "./Game";
import Button from "../../components/Button";

const Home = ({ navigation }) => {
  return (
    <ImageBackground source={BACKGROUND} style={styles.container}>
      <Game />
    </ImageBackground>
  );
};

export { Home };
