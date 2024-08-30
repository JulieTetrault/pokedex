import {
  ImageStyle,
  NativeScrollEvent,
  StyleProp,
  useWindowDimensions,
  ViewStyle,
} from "react-native";
import {
  AnimatedStyle,
  interpolate,
  ScrollHandlerProcessed,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface PageAnimationType {
  onScroll?: ScrollHandlerProcessed;
  imageAnimation?: StyleProp<AnimatedStyle<StyleProp<ImageStyle>>>;
  headerAnimation?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
  contentAnimation?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
}

export const usePageAnimation = (imageUri?: string): PageAnimationType => {
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const maxSize = screenHeight * 0.25;
  const minSize = 32;
  const scrollRange = [0, minSize * 3];

  const scrollY = useSharedValue(0);
  const insets = useSafeAreaInsets();

  const onScroll = useAnimatedScrollHandler((event: NativeScrollEvent) => {
    scrollY.value = event.contentOffset.y;
  });

  const imageAnimation = useAnimatedStyle(() => {
    const imageSize = interpolate(
      scrollY.value,
      scrollRange,
      [maxSize, minSize],
      "clamp"
    );

    const marginTop = interpolate(
      scrollY.value,
      scrollRange,
      [65 + insets.top, 16 + insets.top],
      "clamp"
    );

    const translateX = interpolate(
      scrollY.value,
      scrollRange,
      [0, screenWidth / 2 - minSize / 2 - 16],
      "clamp"
    );

    return {
      width: imageSize,
      height: imageSize,
      marginTop,
      transform: [{ translateX }],
    };
  });

  const headerAnimation = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, minSize * 3],
      [65 + maxSize + insets.top, 65 + insets.top],
      "clamp"
    );

    return {
      height,
    };
  });

  const contentAnimation = useAnimatedStyle(() => {
    const marginTop = interpolate(
      scrollY.value,
      [0, minSize * 8],
      [65 + maxSize + insets.top, 65 + insets.top],
      "clamp"
    );

    return {
      marginTop,
    };
  });

  return {
    onScroll: imageUri ? onScroll : undefined,
    imageAnimation: imageUri ? imageAnimation : undefined,
    headerAnimation: imageUri ? headerAnimation : undefined,
    contentAnimation: imageUri ? contentAnimation : undefined,
  };
};
