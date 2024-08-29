import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import { Colors } from "../../utils";

interface PokemonsFooterProps {
  isHidden?: boolean;
  isLoading?: boolean;
  onPress: () => void;
}

const styles = StyleSheet.create({
  footer: {
    alignSelf: "center",
    backgroundColor: Colors.PINK,
    borderColor: Colors.GRAY,
    borderWidth: 1,
    marginTop: 16,
    padding: 16,
  },
});

export const PokemonsFooter: React.FC<PokemonsFooterProps> = ({
  isHidden,
  isLoading,
  onPress,
}) => {
  if (isHidden) return null;

  const handlePress = () => {
    if (!isLoading) onPress();
  };

  return (
    <Pressable onPress={handlePress} style={styles.footer}>
      {isLoading && <Text>Loading...</Text>}
      {!isLoading && <Text>Fetch more</Text>}
    </Pressable>
  );
};
