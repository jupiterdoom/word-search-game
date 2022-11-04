import React from "react";
import { Block, BlockTitle, Button, Col, Row } from "framework7-react";
import { Difficult } from "../gameSettings";
import styles from "./MainScreen.module.scss";

export type MainScreenType = {
  onClick: (difficult: Difficult) => void;
};

export function MainScreen({ onClick }: MainScreenType) {
  return (
    <Block className={styles.Block}>
      <BlockTitle>Select Difficulty:</BlockTitle>
      {Object.values(Difficult).map((value) => (
        <Row>
          <Col>
            <Button
              className={styles.Button}
              large
              fill
              onClick={() => {
                onClick(value);
              }}
            >
              {value}
            </Button>
          </Col>
        </Row>
      ))}
    </Block>
  );
}
