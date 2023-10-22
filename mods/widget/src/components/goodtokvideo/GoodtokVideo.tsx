/*
 * Copyright (C) 2023 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/goodtok
 *
 * This file is part of Goodtok
 *
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *    https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import "./styles.css";
import React, { useState, useEffect } from "react";
import { GoodtokButton } from "../goodtokbutton/GoodtokButton";
import { Notification } from "../notification/Notification";
import { Menu } from "../menu/Menu";
import { menuData } from "./data";
import Video from "../video/Video";
import { ActiveComponent, GoodtokVideoEvents } from "./types";

export type GoodtokVideoProps = {
  online: boolean;
  menuOpen: boolean;
  notificationOpen: boolean;
  videoOpen: boolean;
  onEvent: (eventName: GoodtokVideoEvents) => void;
  onNotificationClose: () => void;
};

export const GoodtokVideo: React.FC<GoodtokVideoProps> = ({
  online = false,
  menuOpen = false,
  notificationOpen = false,
  videoOpen = false,
  onEvent,
  onNotificationClose
}) => {
  const [activeComponent, setActiveComponent] = useState<ActiveComponent>(
    ActiveComponent.None
  );

  useEffect(() => {
    if (menuOpen) setActiveComponent(ActiveComponent.Menu);
    else if (notificationOpen) setActiveComponent(ActiveComponent.Notification);
    else if (videoOpen) setActiveComponent(ActiveComponent.Video);
    else setActiveComponent(ActiveComponent.None);
  }, [menuOpen, notificationOpen, videoOpen]);

  return (
    <div className="menu-button-container">
      <Menu
        online={online}
        isOpen={activeComponent === ActiveComponent.Menu}
        data={menuData}
        onItemClicked={(name) => onEvent(name as GoodtokVideoEvents)}
      />
      <Notification
        online={online}
        isOpen={activeComponent === ActiveComponent.Notification}
        onClose={() => {
          onNotificationClose();
          setActiveComponent(ActiveComponent.None);
          onEvent(GoodtokVideoEvents.CLOSE);
        }}
      />
      <Video
        isOpen={activeComponent === ActiveComponent.Video}
        onClose={() => {
          setActiveComponent(ActiveComponent.None);
          onEvent(GoodtokVideoEvents.CLOSE);
        }}
      />
      <GoodtokButton
        online={online}
        onClick={() => {
          if (activeComponent !== ActiveComponent.Menu) {
            setActiveComponent(ActiveComponent.Menu);
          } else {
            setActiveComponent(ActiveComponent.None);
            onEvent(GoodtokVideoEvents.CLOSE);
          }
        }}
      />
    </div>
  );
};
