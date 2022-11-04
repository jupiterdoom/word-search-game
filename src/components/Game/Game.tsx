import React from "react";
import { Grid } from "./Grid/Grid";

import WordSearch from "@blex41/word-search";
import { SelectionColors } from "./SelectionColors/SelectionColors";

import randomWords from "random-words";
import { Difficult, GameSettings, HintType } from "./gameSettings";

export type ColorsMap = {
  [word in string]: string;
};

export type GameType = {
  settings: GameSettings;
};

export function Game({ settings }: GameType) {
  const options = {
    cols: settings.gridLength,
    rows: settings.gridLength,
    disabledDirections: [],
    dictionary: randomWords({
      exactly: settings.exactlyWords,
      maxLength: settings.maxWordLength,
    }).filter((x) => x.length > 2),
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

  // TODO: вынести в отдельный хелпер или функцию или класс, который умеет переданные ему правила css вставлять/менять
  if (settings.difficult !== Difficult.EASY) {
    const sheet = window.document.styleSheets[0];
    sheet.insertRule(
      ":root { --game-grid-symbol-size: var(--game-grid-small-symbol-size) !important; }"
    );
  }

  return <Grid ws={ws} colorsMap={colorsMap} hint={settings.hint} />;
}
