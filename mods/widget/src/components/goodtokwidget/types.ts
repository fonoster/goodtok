/*
 * Copyright (C) 2024 by Fonoster Inc (https://fonoster.com)
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
export enum GoodtokWidgetEvents {
  VIDEO_SESSION_REQUEST = "VIDEO_SESSION_REQUEST",
  VIDEO_MUTE_REQUEST = "VIDEO_MUTE_REQUEST",
  VIDEO_UNMUTE_REQUEST = "VIDEO_UNMUTE_REQUEST",
  AUDIO_SESSION_REQUEST = "AUDIO_SESSION_REQUEST",
  AUDIO_MUTE_REQUEST = "AUDIO_MUTE_REQUEST",
  AUDIO_UNMUTE_REQUEST = "AUDIO_UNMUTE_REQUEST",
  SCHEDULE_MEETING_REQUEST = "SCHEDULE_MEETING_REQUEST",
  SUBMIT_CONTACT_FORM_REQUEST = "SUBMIT_CONTACT_FORM_REQUEST",
  HANGUP_REQUEST = "HANGUP_REQUEST",
  OPEN_MENU_EVENT = "OPEN_MENU_EVENT",
  CLOSE_MENU_EVENT = "CLOSE_MENU_EVENT"
}

export enum ActiveComponent {
  NONE,
  MENU,
  CONTACT_FORM,
  NOTIFICATION,
  VIDEO
}

export type GoodtokWidgetProps = {
  online: boolean;
  menuOpen: boolean;
  notificationOpen: boolean;
  videoOpen: boolean;
  onEvent: (eventName: GoodtokWidgetEvents) => void;
  onNotificationClose: () => void;
};
