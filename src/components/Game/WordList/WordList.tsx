import React from "react";
import { Link } from "framework7-react";

import styles from "./WordList.module.scss";
import { HintType } from "../gameSettings";

export type WordListType = {
  words: string[];
  selectedWords: string[];
  hint: HintType;
};

function replaceSomeLetters(
  word: string,
  replacer: string,
  irreplaceableCount?: number
) {
  if (irreplaceableCount) {
    let innerIrreplaceableIndexes: number[] = [];
    let generateIndex = 0;
    while (innerIrreplaceableIndexes.length < irreplaceableCount) {
      generateIndex = Math.round(Math.random() * (word.length - 1));
      if (!innerIrreplaceableIndexes.includes(generateIndex)) {
        innerIrreplaceableIndexes.push(generateIndex);
      }
    }
    console.dir({ word,innerIrreplaceableIndexes })

    return Array.prototype.map
      .call(word, (letter, index) =>
        innerIrreplaceableIndexes.includes(index) ? letter : replacer
      )
      .join("");
  }

  return Array(word.length).fill(replacer).join("");
}

let cache: { [key in string]: string } = {};

function wordMaskFromCache(word: string, hint: HintType) {
  const cachedKey = `${word}_${hint}`;
  if (cache[cachedKey]) {
    return cache[cachedKey];
  }
  cache[cachedKey] = toMaskWord(word, hint);
  return cache[cachedKey]
}

function toMaskWord(word: string, hint: HintType) {
  if (hint === "half")
    return replaceSomeLetters(word, "-", word.length === 3 ? 1 : 2);
  if (hint === "hidden") return replaceSomeLetters(word, "-");
  return word;
}

//TODO: оптимизировать ре-рендеринг
export function WordList({ words, selectedWords, hint }: WordListType) {
  console.log(words);
  console.log(selectedWords);
  return (
    <div className={styles.Container}>
      {words.map((w) => (
        <Link
          className={styles.Word}
          key={w}
          color={selectedWords.includes(w) ? "gray" : "white"}
        >
          {wordMaskFromCache(w, hint)}
        </Link>
      ))}
    </div>
  );
}
