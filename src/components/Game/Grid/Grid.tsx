import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Cell } from "../Cell/Cell";

import styles from "./Grid.module.scss";
import SelectionLine from "../SelectionLine/SelectionLine";
import {
  CellType,
  SelectionColoredLineType,
  SelectionLineType,
} from "../types";
import { WordList } from "../WordList/WordList";
import { ColorsMap } from "../Game";

const getCell = (dataset: DOMStringMap): CellType => {
  const { x, y, symbol } = dataset;
  return { x: x ? +x : 0, y: y ? +y : 0, symbol: symbol || "" };
};

function isDefined<T>(x: T): x is Exclude<T, undefined> {
  return x === 0 || x === "" || x !== undefined || x !== null;
}

export type GridType = {
  ws: WordSearch.WordSearchReturnType;
  colorsMap: ColorsMap;
};
export function Grid({ ws, colorsMap }: GridType) {
  const [gridOffset, setGridOffset] = useState(null);
  const gridRef = useRef(null);
  console.log(colorsMap);

  const [selectionLines, setSelectionLines] = useState<
    SelectionColoredLineType[]
  >([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);

  const [isMouseDown, setMouseDown] = useState(false);
  const [fromCell, setFromCell] = useState<CellType | undefined>(undefined);
  const [toCell, setToCell] = useState<CellType | undefined>(undefined);
  const [currentCellColor, setCurrentCellColor] = useState("selected");
  const [cellClientWidth, setCellClientWidth] = useState<number>(0);

  useLayoutEffect(() => {
    if (gridRef.current) {
      //@ts-ignore
      setGridOffset(gridRef.current.getBoundingClientRect());
    }
  }, []);

  const checkResult = useCallback(
    ({
      toCell,
      fromCell,
      save = false,
    }: SelectionLineType & { save?: boolean }) => {
      const founded = ws.data.words.find((word) => {
        return (
          word.path[0].x === fromCell.x &&
          word.path[word.word.length - 1].x === toCell.x &&
          word.path[0].y === fromCell.y &&
          word.path[word.word.length - 1].y === toCell.y
        );
      });
      if (!!founded) {
        if (save) {
          setSelectedWords([...selectedWords, founded.word]);
          setSelectionLines([
            ...selectionLines,
            { toCell, fromCell, colorClass: colorsMap[founded.word] },
          ]);
        }

        return colorsMap[founded.word];
      }
      return "selected";
    },
    [ws.settings, selectedWords, selectionLines]
  );

  const mouseDownHandler = (e: any) => {
    if (e.button === 2 || (e.nativeEvent && e.nativeEvent.which === 2)) {
      return;
    }

    const cell = getCell(e.target.dataset);

    setCellClientWidth(e.target.clientWidth);
    setMouseDown(true);
    setFromCell(cell);
    setToCell(cell);
  };

  const mouseMoveHandler = (e: any) => {
    if (!isMouseDown) {
      return;
    }

    const cell = getCell(e.target.dataset);
    setToCell(cell);
    if (isDefined(fromCell)) {
      setCurrentCellColor(checkResult({ fromCell, toCell: cell }));
    }
  };

  const mouseUpHandler = (e: any) => {
    if (!isMouseDown) {
      return;
    }

    if (isDefined(fromCell) && isDefined(toCell)) {
      checkResult({ fromCell, toCell, save: true });
    }

    setFromCell(undefined);
    setToCell(undefined);
    setMouseDown(false);
  };

  const gridStyles = {
    gridTemplateColumns: `repeat(${ws.settings.cols}, 1fr)`,
  };

  return (
    <div className="display-flex flex-direction-column align-items-center">
      <div className={styles.Grid}>
        <div
          className={styles.Table}
          style={gridStyles}
          ref={gridRef}
          onMouseDown={mouseDownHandler}
          onMouseMove={mouseMoveHandler}
          onMouseUp={mouseUpHandler}
        >
          {gridOffset && fromCell && toCell && (
            <SelectionLine
              fromCell={fromCell}
              toCell={toCell}
              clientWidth={cellClientWidth}
              colorClass={currentCellColor}
            />
          )}
          {selectionLines?.map((line) => (
            <SelectionLine
              fromCell={line.fromCell}
              toCell={line.toCell}
              clientWidth={cellClientWidth}
              colorClass={line.colorClass}
            />
          ))}
          {ws?.data.grid.map((line, y) => {
            return line.map((symbol, x) => (
              <Cell x={x} y={y} symbol={symbol} />
            ));
          })}
        </div>
      </div>
      <WordList
        words={ws.data.words.map((x) => x.word)}
        selectedWords={selectedWords}
      />
    </div>
  );
}
