export type CellType = {
  x: number;
  y: number;
  symbol: string;
}

export type SelectionLineType = {
  fromCell: CellType;
  toCell: CellType;
}
