import React from "react";

import styles from './Cell.module.scss';

export type CellType = {
  x: number;
  y: number;
  symbol: string;
}

export function Cell({symbol, x, y}: CellType) {
  return <div className={styles.Cell} data-x={x} data-y={y}>{symbol}</div>
}
