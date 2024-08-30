import React, { PropsWithChildren } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { usePageAnimation } from "../../context";

import { PageContent } from "./page-content";
import { PageHeader } from "./page-header";

interface PageContainerProps {
  isLoading: boolean;
  title?: string;
  imageUri?: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
});

export const PageContainer: React.FC<PropsWithChildren<PageContainerProps>> = ({
  isLoading,
  title,
  imageUri,
  children,
}) => {
  const insets = useSafeAreaInsets();
  const { imageAnimation, onScroll, headerAnimation, contentAnimation } =
    usePageAnimation(imageUri);

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <PageHeader
        title={title}
        imageUri={imageUri}
        imageAnimation={imageAnimation}
        headerAnimation={headerAnimation}
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <PageContent onScroll={onScroll} contentAnimation={contentAnimation}>
          {children}
        </PageContent>
      )}
    </View>
  );
};
