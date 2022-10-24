import React, {useState} from "react";
import { Cell } from "../Cell/Cell";

import styles from "./Grid.module.scss";

export type GridType = {
  ws: WordSearch.WordSearchReturnType;
};
export function Grid({ ws }: GridType) {
  console.log(ws);

  console.log(styles.Grid);

  const [isMouseDown, setMouseDown] = useState(false);
  const [fromCell, setFromCell] = useState(undefined);
  const [toCell, setToCell] = useState(undefined);

  // const mouseDownHandler = (e) => {
  //   if (e.button === 2 || (e.nativeEvent && e.nativeEvent.which === 2)) {
  //     return;
  //   }
  //
  //   const cell = getCell(e.pageX, e.pageY, gridOffset);
  //
  //   setMouseDown(true);
  //   setFromCell(cell);
  //   setToCell(cell);
  // };
  //
  // const mouseMoveHandler = (e) => {
  //   if (!mouseDown) {
  //     return;
  //   }
  //
  //   setToCell(getCell(e.pageX, e.pageY, gridOffset));
  // };
  //
  // const mouseUpHandler = (e) => {
  //   if (!mouseDown) {
  //     return;
  //   }
  //
  //   axios
  //     .post(`${API_HOST}/api/grid/select`, {
  //       words,
  //       grid,
  //       selection: {
  //         fromCell,
  //         toCell,
  //       },
  //     })
  //     .then((res) => {
  //       if (res.data.isValidWord) {
  //         setWords(res.data.words);
  //       }
  //
  //       setMouseDown(false);
  //       setFromCell({ from: null, to: null });
  //       setToCell({ from: null, to: null });
  //     });
  // };

  return (
    <>
      {ws?.data.grid.map((line, x) => {
        return (
          <div className={styles.Grid}>
            {line.map((symbol, y) => (
              <Cell x={x} y={y} symbol={symbol} />
            ))}
          </div>
        );
      })}
    </>
  );
}
