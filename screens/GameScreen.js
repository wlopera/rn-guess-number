import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, FlatList } from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import DefaultStyles from "../constants/default-styles";
import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";

import { Ionicons } from "@expo/vector-icons";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};
const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);

  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  // const [rounds, setRounds] = useState(0);
  const [passGuesses, setPassGuesses] = useState([initialGuess.toString()]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(passGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  // const renderListItem = (value, numOfRound) => (
  //   <View key={value} style={styles.listItem}>
  //     <BodyText>#{numOfRound}</BodyText>
  //     <BodyText>{value}</BodyText>
  //   </View>
  // );

  const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
      <BodyText>#{listLength - itemData.index}</BodyText>
      <BodyText>{itemData.item}</BodyText>
    </View>
  );

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("No  mientas", "Sabes que hay un error...", [{ text: "Disculpe", style: "cancel" }]);
      return;
    }

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    //setRounds((curRounds) => curRounds + 1);
    //setPassGuesses((curPassGuesses) => [nextNumber, ...curPassGuesses]);
    setPassGuesses((curPassGuesses) => [nextNumber.toString(), ...curPassGuesses]);
  };

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.bodyText}>Oponente adivino</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onClick={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} />
        </MainButton>
        <MainButton onClick={() => nextGuessHandler("greater")}>
          <Ionicons name="md-add" size={24} />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {passGuesses.map((guess, index) => renderListItem(guess, passGuesses.length - index))}
        </ScrollView> */}
        <FlatList
          keyExtractor={(item) => item}
          data={passGuesses}
          renderItem={renderListItem.bind(this, passGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 400,
    maxWidth: "90%",
  },
  listContainer: {
    flex: 1,
    width: "60%",
  },
  list: {
    flexGrow: 1,
    //alignItems: "center",
    justifyContent: "flex-end",
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default GameScreen;
