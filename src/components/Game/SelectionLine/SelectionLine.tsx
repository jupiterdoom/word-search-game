import React from "react";
import "./SelectionLine.scss";
import { CellType, SelectionLineType } from "../types";

const getLineLength = (from: CellType, to: CellType) => {
  return Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));
};

const getLineAngle = (from: CellType, to: CellType) => {
  return (Math.atan2(to.y - from.y, to.x - from.x) * 180) / Math.PI;
};

const SelectionLine = ({ fromCell: from, toCell: to }: SelectionLineType) => {
  const length = getLineLength(from, to);
  const angle = getLineAngle(from, to);

  let colorClass = "selected";
  if (angle % 45 !== 0) {
    colorClass = "";
  }

  if (from.x === to.x && from.y === to.y) {
    colorClass = "";
  }
  // if (isPlayer) {
  //   colorClass = angle % 45 !== 0 ? 'unavailable-path' : 'available-path';
  // }

  const style = {
    width: `${length * 50}px`,
    left: `${from.x * 50 + 25}px`,
    top: `${from.y * 50 + Math.floor(25 / 2)}px`,
    // rotate: `rotate(${angle}deg)`,
    transform: `rotate(${angle}deg)`,
  };

  return <div className={`line ${colorClass}`} style={style}></div>;
};

export default SelectionLine;
