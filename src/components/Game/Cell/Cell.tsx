import React from "react";

import styles from './Cell.module.scss';
import {CellType} from "../types";

export function Cell({symbol, x, y}: CellType) {
  return <div className={styles.Cell} data-x={x} data-y={y} data-symbol={symbol}>{symbol}</div>
}
