import React from "react";
import { SectionList, StyleSheet, Text, View } from "react-native";

import {
  PokemonEvolution,
  PokemonMove,
  PokemonResourceLink,
  PokemonType,
} from "../../models";
import { PokemonResourceLinkCard } from "../common";

import { PokemonTypeBadge } from "./pokemon-type-badge";

interface PokemonDetailsProps {
  types: PokemonType[];
  moves: PokemonMove[];
  evolutions: PokemonEvolution[];
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  itemSeparator: {
    height: 8,
  },
  sectionSeparator: {
    height: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
  },
  typeContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
});

export const PokemonDetails: React.FC<PokemonDetailsProps> = ({
  types,
  moves,
  evolutions,
}) => {
  const getSections = () => {
    return [
      {
        title: "First 5 moves",
        data: moves,
        type: "move",
      },
      {
        title: "Evolutions",
        data: evolutions,
        type: "evolution",
      },
    ].filter((section) => section.data.length > 0);
  };

  const renderItem = ({
    item,
    section,
  }: {
    item: PokemonResourceLink;
    section: { title: string; data: PokemonResourceLink[]; type: string };
  }) => {
    if (section.type === "evolution") {
      return (
        <PokemonResourceLinkCard
          href={`/pages/pokemons/${item.id}`}
          item={item}
        />
      );
    }

    return <PokemonResourceLinkCard item={item} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.typeContainer}>
        {types.map((type) => {
          return <PokemonTypeBadge type={type} key={type.name} />;
        })}
      </View>
      <SectionList
        scrollEnabled={false}
        sections={getSections()}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) =>
          title ? <Text style={styles.sectionTitle}>{title}</Text> : null
        }
        SectionSeparatorComponent={() => (
          <View style={styles.sectionSeparator} />
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </View>
  );
};
