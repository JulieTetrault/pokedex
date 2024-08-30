import React, { PropsWithChildren } from "react";
import { ScrollView, StyleProp, View, ViewStyle } from "react-native";
import Animated, {
  AnimatedStyle,
  ScrollHandlerProcessed,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface PageContentProps {
  onScroll?: ScrollHandlerProcessed;
  contentAnimation?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
}

export const PageContent: React.FC<PropsWithChildren<PageContentProps>> = ({
  onScroll,
  contentAnimation,
  children,
}) => {
  const insets = useSafeAreaInsets();

  if (onScroll) {
    return (
      <Animated.ScrollView onScroll={onScroll} scrollEventThrottle={16}>
        <Animated.View style={contentAnimation}>{children}</Animated.View>
      </Animated.ScrollView>
    );
  }

  return (
    <ScrollView>
      <View style={{ marginTop: 65 + insets.top }}>{children}</View>
    </ScrollView>
  );
};
