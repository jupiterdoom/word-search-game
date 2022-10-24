import React from "react";
import { Grid } from "../Grid/Grid";

import WordSearch from "@blex41/word-search";

export function Game() {
  // If an option is missing, it will be given a default value
  const options = {
    cols: 6,
    rows: 6,
    disabledDirections: ["N", "W", "NW", "SW"],
    dictionary: ["ИЛЬЯ", "СЕРГЕЙ", "ПЕТР", "ДМИТРИЙ", "АЛЕКСЕЙ"],
    maxWords: 20,
    backwardsProbability: 0.3,
    upperCase: true,
    diacritics: true,
  };

  // Create a new puzzle
  const ws = new WordSearch(options);

  // Use its methods
  console.log(ws.toString());
  return <Grid ws={ws}/>;
}
