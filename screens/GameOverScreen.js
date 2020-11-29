import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";

import Colors from "../constants/colors";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <TitleText>El Juego ha terminado!</TitleText>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require("../assets/success.png")} resizeMode="cover" />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resulttext}>
          El número de intentos fue:
          <Text style={styles.highlight}> {props.roundsNumber}</Text>
        </BodyText>
        <BodyText style={styles.resulttext}>
          El número a buscar era: <Text style={styles.highlight}>{props.userNumber}</Text>
        </BodyText>
      </View>
      <MainButton onClick={props.onRestart}>Nuevo Juego</MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  resulttext: {
    textAlign: "center",
    fontSize: 20,
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: 15,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
  },
});

export default GameOverScreen;
