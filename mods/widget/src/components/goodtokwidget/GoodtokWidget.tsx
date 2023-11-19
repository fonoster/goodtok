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
import { GoodtokButton as OriginalGoodtokButton } from "../goodtokbutton/GoodtokButton";
import { Notification } from "../notification/Notification";
import { Menu as OriginalMenu } from "../menu/Menu";
import { menuData } from "./data";
import { ActiveComponent, GoodtokWidgetEvents } from "./types";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Video from "../video/Video";

export type GoodtokWidgetProps = {
  online: boolean;
  menuOpen: boolean;
  notificationOpen: boolean;
  hasError: boolean;
  videoOpen: boolean;
  onEvent: (eventName: GoodtokWidgetEvents) => void;
  onNotificationClose: () => void;
  onVideoRefsReady: (refs: any) => void;
};

// Styled-components
const MenuButtonContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Menu = styled(OriginalMenu)`
  z-index: 999;
`;

const GoodtokButton = styled(OriginalGoodtokButton)`
  z-index: 1000;

  /* This targets the scenario where .menu is immediately preceding .goodtok-button */
  ${Menu} + & {
    margin-top: 20px;
  }
`;

export const GoodtokWidget: React.FC<GoodtokWidgetProps> = ({
  online = false,
  menuOpen = false,
  notificationOpen = false,
  hasError = false,
  videoOpen = false,
  onEvent,
  onNotificationClose,
  onVideoRefsReady
}) => {
  const videoRefs = useRef(null);
  const [activeComponent, setActiveComponent] = useState<ActiveComponent>(
    ActiveComponent.None
  );

  useEffect(() => {
    if (menuOpen) setActiveComponent(ActiveComponent.Menu);
    else if (notificationOpen) setActiveComponent(ActiveComponent.Notification);
    else if (videoOpen) setActiveComponent(ActiveComponent.Video);
    else setActiveComponent(ActiveComponent.None);
  }, [menuOpen, notificationOpen, videoOpen]);

  useEffect(() => {
    if (videoRefs.current) {
      onVideoRefsReady(videoRefs.current);
    }
  }, [onVideoRefsReady]);

  return (
    <MenuButtonContainer>
      <Menu
        online={online}
        isOpen={activeComponent === ActiveComponent.Menu}
        data={menuData}
        onItemClicked={(name) => {
          onEvent(name as GoodtokWidgetEvents);
        }}
      />
      <Notification
        online={online}
        isOpen={activeComponent === ActiveComponent.Notification}
        isError={hasError}
        onClose={() => {
          onNotificationClose();
          setActiveComponent(ActiveComponent.None);
          onEvent(GoodtokWidgetEvents.CLOSE);
        }}
      />
      <Video
        ref={videoRefs}
        isOpen={activeComponent === ActiveComponent.Video}
        onCameraMuted={(muted) => {
          if (muted) {
            onEvent(GoodtokWidgetEvents.VIDEO_UNMUTE_REQUEST);
          } else {
            onEvent(GoodtokWidgetEvents.VIDEO_MUTE_REQUEST);
          }
        }}
        onMicrophoneMuted={(muted) => {
          if (muted) {
            onEvent(GoodtokWidgetEvents.AUDIO_UNMUTE_REQUEST);
          } else {
            onEvent(GoodtokWidgetEvents.AUDIO_MUTE_REQUEST);
          }
        }}
        onHangup={() => {
          setActiveComponent(ActiveComponent.None);
          onEvent(GoodtokWidgetEvents.HANGUP_REQUEST);
        }}
        onClose={() => {
          setActiveComponent(ActiveComponent.None);
          onEvent(GoodtokWidgetEvents.CLOSE);
        }}
      />
      <GoodtokButton
        online={online}
        onClick={() => {
          if (activeComponent !== ActiveComponent.Menu) {
            setActiveComponent(ActiveComponent.Menu);
          } else {
            setActiveComponent(ActiveComponent.None);
            onEvent(GoodtokWidgetEvents.CLOSE);
          }
        }}
      />
    </MenuButtonContainer>
  );
};
