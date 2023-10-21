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
import React, { forwardRef, useImperativeHandle } from "react";
import "./styles.css";
import { CloseIcon } from "../icons/CloseIcon";
import { CameraIcon } from "../icons/CameraIcon";
import { MutedCameraIcon } from "../icons/MutedCameraIcon";

type VideoProps = {
  isCustomerVideoMuted?: boolean;
  isOpen?: boolean;
  onClosed?: () => void;
  ref?: any;
};

export const Video = forwardRef((props: VideoProps) => {
  const staffVideoRef = React.createRef<HTMLVideoElement>();
  const customerVideoRef = React.createRef<HTMLVideoElement>();

  // Expose refs to parent
  useImperativeHandle(props.ref, () => ({
    staffVideo: staffVideoRef.current,
    customerVideo: customerVideoRef.current
  }));

  return (
    <div className="goodtok-video">
      <div className="goodtok-video__header">
        <div className="goodtok-video__header__container">
          <CameraIcon />
          <p>00:00:00</p>
          <CloseIcon onClick={props.onClosed} />
        </div>
      </div>
      <div className="goodtok-video__container">
        <video ref={staffVideoRef} className="goodtok-video__staff" />
        {props.isCustomerVideoMuted && (
          <div className="muted-overlay">
            <MutedCameraIcon />
          </div>
        )}
        <video ref={customerVideoRef} className="goodtok-video__customer" />
        <div className="goodtok-video__controls"></div>
      </div>
    </div>
  );
});

export default Video;
