import React from "react";
import {
  Animated,
  DimensionValue,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  PokemonEvolution,
  PokemonMove,
  PokemonResourceLink,
  PokemonType,
} from "../../models";
import { PokemonResourceLinkCard } from "../pokemon-resource-link-card";

import { PokemonTypeBadge } from "./pokemon-type-badge";
import ScrollView = Animated.ScrollView;

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
    width: "fit-content" as DimensionValue,
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
    <ScrollView nestedScrollEnabled style={styles.container}>
      <View style={styles.typeContainer}>
        {types.map((type) => {
          return <PokemonTypeBadge type={type} key={type.name} />;
        })}
      </View>
      <SectionList
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
    </ScrollView>
  );
};
