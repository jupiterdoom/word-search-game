import React from "react";
import "./SelectionColors.scss";

export class SelectionColors {
  selectionColor = "selected";

  getRandomColor() {
    const colorHex = Math.floor(Math.random() * 16777215).toString(16);
    const sheet = window.document.styleSheets[0];
    const className = `colorHex${colorHex}`;
    sheet.insertRule(
      `.line.${className},.${className}::before,.${className}::after { background-color: #${colorHex};}`,
      sheet.cssRules.length
    );

    return className;
  }
}
