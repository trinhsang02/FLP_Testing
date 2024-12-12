import React, { useRef, useState, useEffect } from "react";
import { GameEngine } from "react-native-game-engine";
import entities from "../../../entities";
import { Physics } from "../../../utils/physics";
import { styles } from "./styles";

import { Start } from "./Start";
import { GameOver } from "./GameOver";
import { Betting } from "./Betting";
import { Text, View, Image } from "react-native";
import BASE from "../../../assets/images/base.png";

import One from "../../../assets/images/1.png";
import Two from "../../../assets/images/2.png";
import Three from "../../../assets/images/3.png";
import Four from "../../../assets/images/4.png";
import Five from "../../../assets/images/5.png";
import Six from "../../../assets/images/6.png";
import Seven from ".../../../assets/images/7.png";
import Eight from "../../../assets/images/8.png";
import Nine from "../../../assets/images/9.png";
import Zero from "../../../assets/images/0.png";

import { addScoreToFirebase } from "../../../database/storeScore";
import { useStateContext } from "../../../context";
import { useAccount } from "wagmi";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { changeBirdColor } from "../../../redux/action-creators/index";
import { Action } from "../../../redux/actions/index";
import { State } from "../../../redux";




const numberImages = {
  0: Zero,
  1: One,
  2: Two,
  3: Three,
  4: Four,
  5: Five,
  6: Six,
  7: Seven,
  8: Eight,
  9: Nine,
};

const Game = () => {
  const [running, setIsRunning] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [scoreSaved, setScoreSaved] = useState(0);
  const [isBetting, setIsBetting] = useState(false); // NEW: State betting
  const [betAmount, setBetAmount] = useState(0); // NEW: Betting value
  const { address } = useAccount();
  const gameEngineRef = useRef();
  const skin = useSelector((state: State) => state.changeBirdColor.birdColor);
  const dispatch = useDispatch();



  const handleBackToStart = () => {
    setIsRunning(false);
    setIsGameOver(false);
    setScoreSaved(0);
    setIsBetting(false);
  };

  const handleOnStart = () => {
    setIsBetting(true); 
    // setIsRunning(true);
    // setIsGameOver(false);
    // setScoreSaved(0);
  };

  const handleOnBet = (amount) => {
    setBetAmount(amount); // Betting amount
    setIsBetting(false);
    setIsRunning(true); 
  };

  const handleSkipBet = () => {
    setIsBetting(false); 
    setIsRunning(true); 
  };

  const handleOnGameOver = async () => {
    setIsRunning(false);
    setIsGameOver(true);
    setScoreSaved(currentPoints);
    setCurrentPoints(0);
  };

  const handleOnEvent = (e) => {
    switch (e.type) {
      case "game_over":
        handleOnGameOver();

        //setCurrentPoints(0);
        break;
      case "new_point":
        setCurrentPoints(currentPoints + 1);
        break;

    }
  };
  // Score view
  const renderImage = (Points) => {
    if (Points < 10) {
      const imageStyle = Points === 1
        ? { width: 50, height: 75 }
        : { width: 22.3, height: 75 };

      return (
        <View style={{ alignSelf: "center", marginTop: 20 }}>
          <Image
            source={numberImages[Points]}
            style={Points === 1 ? { width: 30, height: 75 } : { width: 50, height: 75 }}
          />
        </View>
      );
    } else {
      const firstDigit = Math.floor(Points / 10);
      const secondDigit = Points % 10;
      return (
        <View
          style={{ flexDirection: "row", alignSelf: "center", marginTop: 20 }}
        >
          <Image
            source={numberImages[firstDigit]}
            style={firstDigit === 1 ? { width: 30, height: 75 } : { width: 50, height: 75 }}
          />
          <Image
            source={numberImages[secondDigit]}
            style={secondDigit === 1 ? { width: 30, height: 75 } : { width: 50, height: 75 }}
          />
        </View>
      );
    }
  };

  if (!running && !isGameOver && !isBetting) {
    addScoreToFirebase(address?.toString(), currentPoints);
    return <Start handleOnStart={handleOnStart} />;
  }

  if (!running && !isGameOver && isBetting) {
    return <Betting handleOnBet={handleOnBet} handleSkipBet={handleSkipBet} />;
  }

  if (!running && isGameOver) {
    return <GameOver handleBackToStart={handleBackToStart} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <View>{renderImage(currentPoints)}</View>
      <GameEngine
        systems={[Physics]}
        running={running}
        ref={gameEngineRef}
        entities={entities(skin)}
        onEvent={handleOnEvent}
        style={styles.engineContainer}
      />
      <Image source={BASE} style={{ position: "absolute", bottom: 0, width: "100%", height: 150 }} />
    </View>
  );
};

export default Game;