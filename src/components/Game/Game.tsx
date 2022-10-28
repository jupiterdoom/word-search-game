import React from "react";
import { Grid } from "./Grid/Grid";

import WordSearch from "@blex41/word-search";
import { SelectionColors } from "./SelectionColors/SelectionColors";

export type ColorsMap = {
  [word in string]: string;
};

export function Game() {
  const options = {
    cols: 7,
    rows: 7,
    disabledDirections: ["N", "W", "NW", "SW"],
    dictionary: ["ИЛЬЯ", "СЕРГЕЙ", "ПЕТР", "ДМИТРИЙ", "АЛЕКСЕЙ"],
    maxWords: 20,
    backwardsProbability: 0.3,
    upperCase: true,
    diacritics: true,
  };

  const ws = new WordSearch(options);
  const colors = new SelectionColors();

  const colorsMap = ws.data.words.reduce(
    (acc, val) => ({
      ...acc,
      [val.word]: colors.getRandomColor(),
    }),
    {} as ColorsMap
  );

  return <Grid ws={ws} colorsMap={colorsMap} />;
}
