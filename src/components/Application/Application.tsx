import React, { useEffect, useRef, useState } from "react";
import { Game } from "../Game/Game";
import {
  App,
  Badge,
  BlockTitle,
  Button,
  Icon,
  Link,
  List,
  ListItem,
  Navbar,
  NavLeft,
  NavRight,
  NavTitle,
  Page,
  Popup,
  Toolbar,
  View,
  Views,
} from "framework7-react";
import { StatsModal } from "../Modals/StatsModal/StatsModal";
import { Difficult, GameSettings } from "../Game/gameSettings";

import "./App.css";
import { MainScreen } from "../Game/MainScreen/MainScreen";

function Application() {
  const [difficult, setDifficult] = useState<Difficult | undefined>(undefined);
  const settings = difficult ? GameSettings[difficult] : GameSettings.Easy;

  return (
    <App theme="auto" name="My App" id="com.demoapp.test">
      {/* Your main view, should have "main" prop */}
      <View main>
        <Page>
          <div title={"LOGO"}>
            <NavLeft>
              <Link popupOpen={".demo-popup-swipe"}>
                <Icon f7={"chart_bar_alt_fill"} />
              </Link>
            </NavLeft>

            <NavRight>
              <Icon f7={"bars"}></Icon>
            </NavRight>
          </div>
          {!difficult ? (
            <MainScreen onClick={setDifficult} />
          ) : (
            <Game settings={settings} />
          )}
          <StatsModal />
        </Page>
      </View>
    </App>
  );
}

export default Application;
