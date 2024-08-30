import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { Pokemon } from "../../models";
import { PokemonResourceLinkCard } from "../common";

interface PokemonsProps {
  items: Pokemon[];
  footer?: React.ReactElement;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  separator: {
    height: 8,
  },
});

export const Pokemons: React.FC<PokemonsProps> = ({ items, footer }) => {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      data={items}
      renderItem={({ item }) => (
        <PokemonResourceLinkCard
          href={`/pages/pokemons/${item.id}`}
          item={item}
        />
      )}
      ListFooterComponent={footer}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};
