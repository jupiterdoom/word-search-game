declare module "@blex41/word-search" {
  declare class WordSearch {
    constructor(settings: WordSearch.WordSearchSettings);

    data: WordSearch.WordSearchData;
    settings: WordSearch.WordSearchSettings;
  }


  export default WordSearch;
}

declare namespace WordSearch {
  export interface Path {
    x: number;
    y: number;
  }

  export interface Word {
    clean: string;
    path: Path[];
    word: string;
  }

  export interface WordSearchData {
    grid: string[][];
    words: Word[];
  }

  export interface WordSearchReturnType {
    data: WordSearchData;
    settings: WordSearchSettings;
  }

  export interface WordSearchSettings {
    cols: number;
    rows: number;
    disabledDirections: string[];
    dictionary: string[];
    maxWords: number;
    backwardsProbability: number;
    upperCase: boolean;
    diacritics: boolean;
  }
}
