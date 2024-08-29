import React, { PropsWithChildren } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useNavigation } from "expo-router";

import { Colors } from "../utils";

const { height, width } = Dimensions.get("window");
const maxHeight = height * 0.25;
const minHeight = 32;

type Props = {
  title?: string;
  image?: string;
};

const styles = StyleSheet.create({
  back: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  button: {
    paddingVertical: 16,
  },
  header: {
    backgroundColor: Colors.WHITE,
    borderBottomWidth: 1,
    borderColor: Colors.GRAY,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  image: {
    alignItems: "flex-end", // Center the image horizontally
    paddingVertical: 16, // Add padding between title and image
    flex: 1,
  },
  part: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingVertical: 16,
    textAlign: "center",
    textTransform: "capitalize",
  },
});

const PageContainer: React.FC<PropsWithChildren<Props>> = ({
  children,
  image,
  title,
}) => {
  const insets = useSafeAreaInsets();
  const { goBack } = useNavigation();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const animatedImageStyle = useAnimatedStyle(() => {
    const imageSize = interpolate(
      scrollY.value,
      [0, maxHeight],
      [maxHeight, minHeight],
      "clamp"
    );

    const translateX = interpolate(
      scrollY.value,
      [0, maxHeight],
      [0, width / 2 - minHeight / 2 - 16],
      "clamp"
    );

    const translateY = interpolate(
      scrollY.value,
      [0, maxHeight],
      [0, -(maxHeight / 2 - minHeight / 2)],
      "clamp"
    );

    return {
      width: imageSize,
      height: imageSize,
      transform: [{ translateX }, { translateY }],
    };
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Pressable onPress={goBack} style={[styles.button, styles.part]}>
          <Text style={styles.back}>← Back</Text>
        </Pressable>
        <Text style={[styles.title, styles.part]}>{title}</Text>
        {image ? (
          <Animated.View style={[styles.image, styles.part]}>
            <Animated.Image
              style={animatedImageStyle}
              source={{ uri: image }}
              resizeMode="contain"
            />
          </Animated.View>
        ) : (
          <View style={styles.part} />
        )}
      </View>
      {image ? (
        <Animated.ScrollView nestedScrollEnabled onScroll={scrollHandler} scrollEventThrottle={16}>
          {children}
        </Animated.ScrollView>
      ) : (
        children
      )}
    </View>
  );
};

// eslint-disable-next-line import/no-default-export
export default PageContainer;
