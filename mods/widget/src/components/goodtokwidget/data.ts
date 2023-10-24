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
import { CalendarIcon } from "../icons/CalendarIcon";
import { CameraIcon } from "../icons/CameraIcon";
import { PhoneIcon } from "../icons/PhoneIcon";
import { GoodtokWidgetEvents } from "./types";

export const menuData = [
  {
    Icon: CameraIcon,
    label: "Request video session",
    name: GoodtokWidgetEvents.VIDEO_SESSION_REQUEST,
    requiresOnline: true
  },
  {
    Icon: PhoneIcon,
    label: "Request audio session",
    name: GoodtokWidgetEvents.AUDIO_SESSION_REQUEST,
    requiresOnline: true
  },
  {
    Icon: CalendarIcon,
    label: "Schedule a meeting",
    name: GoodtokWidgetEvents.SCHEDULE_MEETING_REQUEST
  }
];
