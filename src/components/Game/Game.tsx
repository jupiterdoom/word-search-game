import React, { useCallback, useState } from "react";
import { Grid } from "./Grid/Grid";

import WordSearch from "@blex41/word-search";
import { CellType, SelectionLineType } from "./types";
import Word = WordSearch.Word;

export function Game() {
  const [selectionLines, setSelectionLines] = useState<SelectionLineType[]>([]);
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

  const checkResult = useCallback(
    ({ toCell, fromCell }: SelectionLineType) => {
      const founded = ws.data.words.find((word: Word) => {
        return (
          word.path[0].x === fromCell.x &&
          word.path[word.word.length - 1].x === toCell.x &&
          word.path[0].y === fromCell.y &&
          word.path[word.word.length - 1].y === toCell.y
        );
      });
      if (!!founded) {
        setSelectionLines((prev) => {
          prev.push({ toCell, fromCell });
          return prev;
        });
        return true;
      }
      return false;
    },
    [ws.settings]
  );

  // Use its methods
  console.log(ws.toString());
  return (
    <Grid ws={ws} checkResult={checkResult} selectionLines={selectionLines} />
  );
}
