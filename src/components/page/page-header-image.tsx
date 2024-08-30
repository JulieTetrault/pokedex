import React from "react";
import { ImageStyle, StyleProp, StyleSheet } from "react-native";
import Animated, { AnimatedStyle } from "react-native-reanimated";

interface PageHeaderImageProps {
  uri: string;
  style: StyleProp<AnimatedStyle<StyleProp<ImageStyle>>>;
}

const styles = StyleSheet.create({
  image: {
    margin: "auto",
  },
});

export const PageHeaderImage: React.FC<PageHeaderImageProps> = ({
  uri,
  style,
}) => {
  return (
    <Animated.View>
      <Animated.Image
        style={[style, styles.image]}
        source={{ uri }}
        resizeMode="contain"
      />
    </Animated.View>
  );
};
