import React, { useLayoutEffect, useRef, useState } from "react";
import { Cell } from "../Cell/Cell";

import styles from "./Grid.module.scss";
import SelectionLine from "../SelectionLine/SelectionLine";
import { CellType, SelectionLineType } from "../types";

const getCell = (dataset: DOMStringMap): CellType => {
  const { x, y, symbol } = dataset;
  return { x: x ? +x : 0, y: y ? +y : 0, symbol: symbol || "" };
};

function isDefined<T>(x: T): x is Exclude<T, undefined> {
  return x === 0 || x === "" || x !== undefined || x !== null;
}

export type GridType = {
  ws: WordSearch.WordSearchReturnType;
  checkResult: (arg: SelectionLineType) => boolean;
  selectionLines?: SelectionLineType[];
};
export function Grid({ ws, checkResult, selectionLines }: GridType) {
  console.log(ws);

  console.log(styles.Table);

  const [gridOffset, setGridOffset] = useState(null);
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    if (gridRef.current) {
      //@ts-ignore
      setGridOffset(gridRef.current.getBoundingClientRect());
    }
  }, []);

  const [isMouseDown, setMouseDown] = useState(false);
  const [fromCell, setFromCell] = useState<CellType | undefined>(undefined);
  const [toCell, setToCell] = useState<CellType | undefined>(undefined);

  const mouseDownHandler = (e: any) => {
    if (e.button === 2 || (e.nativeEvent && e.nativeEvent.which === 2)) {
      return;
    }

    console.log(e);

    const cell = getCell(e.target.dataset);

    setMouseDown(true);
    setFromCell(cell);
    setToCell(cell);
  };

  const mouseMoveHandler = (e: any) => {
    if (!isMouseDown) {
      return;
    }

    setToCell(getCell(e.target.dataset));
  };

  const mouseUpHandler = (e: any) => {
    if (!isMouseDown) {
      return;
    }

    let founded = false;

    if (isDefined(fromCell) && isDefined(toCell)) {
      console.log(ws);
      founded = checkResult({ fromCell, toCell });
    }

    console.log(founded);

    if (!founded) {
      setFromCell(undefined);
      setToCell(undefined);
    }

    setMouseDown(false);
    // setFromCell(undefined);
    // setToCell(undefined);
  };

  return (
    <div className={styles.Grid}>
      {gridOffset && fromCell && toCell && (
        <SelectionLine fromCell={fromCell} toCell={toCell} />
      )}
      {selectionLines?.map((line) => (
        <SelectionLine fromCell={line.fromCell} toCell={line.toCell} />
      ))}
      <div
        ref={gridRef}
        onMouseDown={mouseDownHandler}
        onMouseMove={mouseMoveHandler}
        onMouseUp={mouseUpHandler}
      >
        {ws?.data.grid.map((line, y) => {
          return (
            <div className={styles.Table}>
              {line.map((symbol, x) => (
                <Cell x={x} y={y} symbol={symbol} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
