import React from "react";
import {
  ImageStyle,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import Animated, { AnimatedStyle } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useNavigation } from "expo-router";

import { Colors } from "../../utils";

import { PageHeaderImage } from "./page-header-image";

interface PageHeaderProps {
  title?: string;
  imageUri?: string;
  imageAnimation?: StyleProp<AnimatedStyle<StyleProp<ImageStyle>>>;
  headerAnimation?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
}

const styles = StyleSheet.create({
  backButton: {
    alignItems: "flex-start",
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: "auto",
    textTransform: "uppercase",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    left: 0,
    minHeight: 65,
    padding: 16,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1000,
  },
  header: {
    backgroundColor: Colors.WHITE,
    borderBottomWidth: 1,
    borderColor: Colors.GRAY,
    left: 0,
    minHeight: 65,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1000,
  },
  part: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "capitalize",
  },
});

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  imageUri,
  imageAnimation,
  headerAnimation,
}) => {
  const { goBack } = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <Animated.View
      style={[styles.header, { height: 65 + insets.top }, headerAnimation]}
    >
      <Animated.View style={[styles.content, { marginTop: insets.top }]}>
        <Pressable onPress={goBack} style={[styles.backButton, styles.part]}>
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.part} />
      </Animated.View>
      {imageUri && <PageHeaderImage uri={imageUri} style={imageAnimation} />}
    </Animated.View>
  );
};
