import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { PokemonType } from "../../models";
import { Colors } from "../../utils";

interface PokemonTypeBadgeProps {
  type: PokemonType;
}

const styles = StyleSheet.create({
  badge: {
    alignItems: "center",
    alignSelf: "flex-start",
    borderColor: Colors.TRANSPARENT,
    borderRadius: 2,
    borderWidth: 2,
    flex: 1,
    minHeight: 18,
  },
  badgeText: {
    color: Colors.WHITE,
    fontSize: 16,
    textTransform: "capitalize",
  },
});

export const PokemonTypeBadge: React.FC<PokemonTypeBadgeProps> = ({ type }) => {
  return (
    <View style={[styles.badge, { backgroundColor: type.color }]}>
      <Text style={styles.badgeText}>{type.name}</Text>
    </View>
  );
};
