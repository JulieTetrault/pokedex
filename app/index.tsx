import { Pressable, StyleSheet, Text, View } from "react-native";

import { Link } from "expo-router";

import { Colors } from "../src/utils";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  pokemons: {
    backgroundColor: Colors.WHITE,
    borderColor: Colors.GRAY,
    borderWidth: 1,
    padding: 32,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Link href="/pages/pokemons" asChild>
        <Pressable style={styles.pokemons}>
          <Text style={styles.text}>Pokemons</Text>
        </Pressable>
      </Link>
    </View>
  );
};

// eslint-disable-next-line import/no-default-export
export default HomeScreen;
