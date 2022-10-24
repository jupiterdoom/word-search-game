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
import {StatsModal} from "../Modals/StatsModal/StatsModal";

function Application() {
  return (
    <App theme="auto" name="My App" id="com.demoapp.test">
      {/* Your main view, should have "main" prop */}
      <View main>
        <Page>
          <Navbar title={"LOGO"}>
            <NavLeft>
              <Link popupOpen={".demo-popup-swipe"}>
                <Icon f7={"chart_bar_alt_fill"} />
              </Link>
            </NavLeft>

            <NavRight>
              <Icon f7={"bars"}></Icon>
            </NavRight>
          </Navbar>
          <BlockTitle>Scroll bottom</BlockTitle>
          <Game />
          <StatsModal />
        </Page>
      </View>
    </App>
  );
}

export default Application;
