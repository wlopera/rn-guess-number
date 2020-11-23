import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const GameOverScreen = (props) => {
  return (
    <View style={style.screen}>
      <Text>El Juego ha terminado!</Text>
      <Text>Número de intentos: {props.roundsNumber}</Text>
      <Text>El Número era: {props.userNumber}</Text>
      <Button title="Nuevo Juego" onPress={props.onRestart} />
    </View>
  );
};

const style = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GameOverScreen;
