import React from "react";
import "./SelectionColors.scss";

export class SelectionColors {
  selectionColor = "selected";

  addLeadingZeroes = (str: string, size: number) => {
    const newStr = "000000" + str;
    return newStr.substring(newStr.length - size);
  };

  getRandomColor() {
    const colorHex = Math.floor(Math.random() * 16777215).toString(16);
    const sheet = window.document.styleSheets[0];
    const correctedHex =
      colorHex.length !== 6 ? this.addLeadingZeroes(colorHex, 6) : colorHex;
    const className = `colorHex${correctedHex}`;
    sheet.insertRule(
      `.line.${className},.${className}::before,.${className}::after { background-color: #${correctedHex};}`,
      sheet.cssRules.length
    );

    return className;
  }
}
