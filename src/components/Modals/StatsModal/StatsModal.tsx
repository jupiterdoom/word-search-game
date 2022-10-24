import React from "react";
import { Button, Icon, Link, Page, Popup, View, Views } from "framework7-react";

export function StatsModal() {
  return (
    <Popup className="demo-popup-swipe" swipeToClose>
      <Page className="padding">
        <div className="display-flex justify-content-end">
          <Link popupClose>
            <Icon f7={"multiply"}></Icon>
          </Link>
        </div>

        <div className="display-flex justify-content-center align-items-center">
          <Views tabs>
            <View id="tab-1" main tab tabActive>
              <Button tabLink={"#tab-2"}>Stats</Button>
              <div>1</div>
            </View>
            <View id="tab-2" tab>
              <Button tabLink={"#tab-1"}>Achievements</Button>
              <div>2</div>
            </View>
          </Views>
        </div>
      </Page>
    </Popup>
  );
}
