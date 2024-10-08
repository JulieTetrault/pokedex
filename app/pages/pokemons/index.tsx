import React from "react";

import {
  PageContainer,
  Pokemons,
  PokemonsFooter,
} from "../../../src/components";
import { usePokemonsQuery } from "../../../src/services/queries";

const PokemonsScreen = () => {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    usePokemonsQuery();

  return (
    <PageContainer title="Pokemons" isLoading={isLoading}>
      {data && (
        <Pokemons
          items={data.pages.flat()}
          footer={
            <PokemonsFooter
              isHidden={!hasNextPage}
              onPress={fetchNextPage}
              isLoading={isFetchingNextPage}
            />
          }
        />
      )}
    </PageContainer>
  );
};

// eslint-disable-next-line import/no-default-export
export default PokemonsScreen;
