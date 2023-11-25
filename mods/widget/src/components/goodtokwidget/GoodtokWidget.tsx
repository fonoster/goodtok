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
import { Notification, NotificationType } from "../notification/Notification";
import { ActiveComponent, GoodtokWidgetEvents } from "./types";
import { Item } from "../menu/Menu";
import { Contact } from "../contact/Contact";
import {
  GoodtokButton,
  Menu,
  MenuButtonContainer
} from "./GoodtokWidgetStyles";
import React, { useState, useEffect, useRef } from "react";
import Video from "../video/Video";
import MobileVideo from "../video/MobileVideo";

export type GoodtokWidgetProps = {
  online: boolean;
  notificationOpen: boolean;
  menuOpen: boolean;
  videoOpen: boolean;
  contactFormOpen: boolean;
  notificationType: NotificationType;
  initialCameraMutedState: boolean;
  menuData: Item[];
  onEvent: (eventName: GoodtokWidgetEvents, data?: object) => void;
  onNotificationClose: () => void;
  onVideoRefsReady: (refs: any) => void;
};

export const GoodtokWidget: React.FC<GoodtokWidgetProps> = ({
  online = false,
  notificationOpen = false,
  menuOpen = false,
  videoOpen = false,
  contactFormOpen = false,
  notificationType,
  initialCameraMutedState = false,
  menuData = [],
  onEvent,
  onNotificationClose,
  onVideoRefsReady
}) => {
  const videoRefs = useRef(null);
  const [activeComponent, setActiveComponent] = useState<ActiveComponent>(
    ActiveComponent.NONE
  );

  const MOBILE_BREAKPOINT = 630;

  const [isMobile, setIsMobile] = useState(
    window.innerWidth < MOBILE_BREAKPOINT
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (menuOpen) setActiveComponent(ActiveComponent.MENU);
    else if (notificationOpen) setActiveComponent(ActiveComponent.NOTIFICATION);
    else if (videoOpen) setActiveComponent(ActiveComponent.VIDEO);
    else if (contactFormOpen) setActiveComponent(ActiveComponent.CONTACT_FORM);
    else setActiveComponent(ActiveComponent.NONE);
  }, [menuOpen, notificationOpen, videoOpen, contactFormOpen]);

  useEffect(() => {
    if (videoRefs.current) {
      onVideoRefsReady(videoRefs.current);
    }
  }, [onVideoRefsReady]);

  const mobileAndVideoOpen = isMobile && videoOpen;

  return (
    <MenuButtonContainer
      style={{
        bottom: mobileAndVideoOpen ? 0 : "20px",
        right: mobileAndVideoOpen ? 0 : "20px"
      }}
    >
      <Menu
        online={online}
        isOpen={activeComponent === ActiveComponent.MENU}
        data={menuData}
        onItemClicked={(name) => {
          onEvent(name as GoodtokWidgetEvents);
        }}
      />

      <Contact
        online={online}
        isOpen={activeComponent === ActiveComponent.CONTACT_FORM}
        onSubmit={(data) => {
          setActiveComponent(ActiveComponent.NONE);
          onEvent(GoodtokWidgetEvents.SUBMIT_CONTACT_FORM_REQUEST, data);
        }}
        onClose={() => {
          setActiveComponent(ActiveComponent.NONE);
          onEvent(GoodtokWidgetEvents.CLOSE_MENU_EVENT);
        }}
      />

      <Notification
        online={online}
        isOpen={activeComponent === ActiveComponent.NOTIFICATION}
        type={notificationType}
        onClose={() => {
          onNotificationClose();
          setActiveComponent(ActiveComponent.NONE);
          onEvent(GoodtokWidgetEvents.CLOSE_MENU_EVENT);
        }}
      />

      {isMobile ? (
        <MobileVideo
          ref={videoRefs}
          isOpen={activeComponent === ActiveComponent.VIDEO}
          initialCameraMutedState={initialCameraMutedState}
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
            setActiveComponent(ActiveComponent.NONE);
            onEvent(GoodtokWidgetEvents.HANGUP_REQUEST);
          }}
        />
      ) : (
        <Video
          ref={videoRefs}
          isOpen={activeComponent === ActiveComponent.VIDEO}
          initialCameraMutedState={initialCameraMutedState}
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
            setActiveComponent(ActiveComponent.NONE);
            onEvent(GoodtokWidgetEvents.HANGUP_REQUEST);
          }}
          onClose={() => {
            setActiveComponent(ActiveComponent.NONE);
            onEvent(GoodtokWidgetEvents.CLOSE_MENU_EVENT);
          }}
        />
      )}

      {/* We hide the GoodtokButton component when the video is open on mobile */}
      {((isMobile && !videoOpen) || !isMobile) && (
        <GoodtokButton
          online={online}
          onClick={() => {
            if (activeComponent !== ActiveComponent.MENU) {
              setActiveComponent(ActiveComponent.MENU);
              onEvent(GoodtokWidgetEvents.OPEN_MENU_EVENT);
            } else {
              setActiveComponent(ActiveComponent.NONE);
              onEvent(GoodtokWidgetEvents.CLOSE_MENU_EVENT);
            }
          }}
        />
      )}
    </MenuButtonContainer>
  );
};
