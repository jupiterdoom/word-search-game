import React from "react";
import {Link} from "framework7-react";

export type WordListType = {
  words: string[];
  selectedWords: string[];
};

export function WordList({ words, selectedWords }: WordListType) {
  console.log(words);
  console.log(selectedWords);
  return (
    <div className="display-flex flex-direction-column justify-content-space-between align-items-center">
      {words.map((w) => (
        <Link key={w} color={selectedWords.includes(w) ? "gray" : "default"}>{w}</Link>
      ))}
    </div>
  );
}
