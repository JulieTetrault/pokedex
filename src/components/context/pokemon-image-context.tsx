import React, {PropsWithChildren} from 'react'

import {Dimensions, ImageStyle} from "react-native";
import {interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue} from "react-native-reanimated";

export type PokemonImageData = {
  readonly imageStyle?: ImageStyle
};

const PokemonImageContext = React.createContext<PokemonImageData>({ imageStyle: undefined })

export const PokemonImageProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { height, width } = Dimensions.get("window");
  const maxHeight = height * 0.25;
  const minHeight = 32;
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


  const value = {
    imageStyle: animatedImageStyle
  }
  return <PokemonImageContext.Provider value={value}>{children}</PokemonImageContext.Provider>
}

export const usePokemonImage = (): PokemonImageData => React.useContext(PokemonImageContext)
