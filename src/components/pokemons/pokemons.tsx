import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { Pokemon } from "../../models";
import { PokemonResourceLinkCard } from "../pokemon-resource-link-card";

interface PokemonsProps {
  items: Pokemon[];
  title?: string;
  footer?: React.ReactElement;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  separator: {
    height: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export const Pokemons: React.FC<PokemonsProps> = ({ items, title, footer }) => {
  return (
    <FlatList
      data={items}
      contentContainerStyle={[styles.container]}
      renderItem={({ item }) => (
        <PokemonResourceLinkCard
          href={`/pages/pokemons/${item.id}`}
          item={item}
        />
      )}
      ListHeaderComponent={() =>
        title ? <Text style={styles.title}>{title}</Text> : null
      }
      ListFooterComponent={footer}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};
