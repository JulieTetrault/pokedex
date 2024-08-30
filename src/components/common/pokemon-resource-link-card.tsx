import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Link } from "expo-router";

import { PokemonResourceLink } from "../../models";
import { Colors } from "../../utils";

interface PokemonResourceLinkCardProps {
  item: PokemonResourceLink;
  href?: string;
}

const styles = StyleSheet.create({
  card: {
    padding: 8,
  },
  container: {
    backgroundColor: Colors.WHITE,
    borderColor: Colors.GRAY,
    borderWidth: 1,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  url: {
    color: Colors.GRAY,
    fontSize: 12,
    marginTop: 4,
  },
});

export const PokemonResourceLinkCard: React.FC<PokemonResourceLinkCardProps> =
  ({ item, href }) => {
    const renderCard = (pokemonResourceLink: PokemonResourceLink) => {
      return (
        <View style={styles.card}>
          <Text style={styles.name}>{pokemonResourceLink.name}</Text>
          <Text style={styles.url}>{pokemonResourceLink.url}</Text>
        </View>
      );
    };

    return (
      <View style={styles.container}>
        {href ? (
          <Link href={href} asChild>
            <Pressable>{renderCard(item)}</Pressable>
          </Link>
        ) : (
          renderCard(item)
        )}
      </View>
    );
  };
