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
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";
import { MutedCameraIcon } from "../icons/MutedCameraIcon";
import { CircleMicrophoneIcon } from "../icons/CircleMicrophoneIcon";
import { CirclePiPIcon } from "../icons/CirclePiPIcon";
import { CircleCameraIcon } from "../icons/CircleCameraIcon";
import { CircleHangupIcon } from "../icons/CircleHangupIcon";
import { CircleMicrophoneMutedIcon } from "../icons/CircleMicrophoneMutedIcon";
import { CircleCameraMutedIcon } from "../icons/CircleCameraMutedIcon";
import {
  ButtonCircleWrapper,
  Controls,
  CustomerVideo,
  CustomerVideoContainer,
  MobileVideoContainer,
  MutedOverlay,
  StaffVideo,
  StaffVideoContainer
} from "./MobileVideoStyles";

type VideoProps = {
  isCustomerCameraMuted?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  onHangup?: () => void;
  onCameraMuted?: (muted: boolean) => void;
  onMicrophoneMuted?: (muted: boolean) => void;
};

export const MobileVideo = forwardRef((props: VideoProps, ref) => {
  const [isCustomerCameraMuted, setIsCustomeCameraMuted] = useState(false);
  const [isCustomerMicrophoneMuted, setIsCustomerMicrophoneMuted] =
    useState(false);
  const staffVideoRef = React.createRef<HTMLVideoElement>();
  const staffAudio = React.createRef<HTMLAudioElement>();
  const customerVideoRef = React.createRef<HTMLVideoElement>();

  useEffect(() => {
    if (!staffVideoRef.current || !customerVideoRef.current) return;
    staffVideoRef.current.addEventListener(
      "enterpictureinpicture",
      function () {
        if (!staffVideoRef.current || !customerVideoRef.current) return;
        customerVideoRef.current.style.display = "none";
        staffVideoRef.current.style.top = "0";
      }
    );

    staffVideoRef.current.addEventListener(
      "leavepictureinpicture",
      function () {
        if (!staffVideoRef.current || !customerVideoRef.current) return;
        customerVideoRef.current.style.display = "block";
        staffVideoRef.current.style.top = "-55px";
      }
    );
  });

  // Expose refs to parent
  useImperativeHandle(ref, () => ({
    staffVideo: staffVideoRef.current,
    staffAudio: staffAudio.current,
    customerVideo: customerVideoRef.current
  }));

  useEffect(() => {
    if (props.isOpen) {
      if (staffVideoRef.current) staffVideoRef.current.style.opacity = "1";
      if (customerVideoRef.current)
        customerVideoRef.current.style.opacity = "1";
    } else {
      if (staffVideoRef.current) staffVideoRef.current.style.opacity = "0";
      if (customerVideoRef.current)
        customerVideoRef.current.style.opacity = "0";
    }
  }, [props.isOpen]);

  return (
    <MobileVideoContainer style={{ display: props.isOpen ? "block" : "none" }}>
      <StaffVideoContainer>
        <audio style={{ display: "none" }} id="goodtok-audio" controls>
          <p>Your browser doesn't support HTML5 audio.</p>
        </audio>
        <StaffVideo ref={staffVideoRef} className="goodtok-video__staff" />
        {isCustomerCameraMuted && (
          <MutedOverlay>
            <MutedCameraIcon />
          </MutedOverlay>
        )}
        <CustomerVideoContainer>
          <CustomerVideo
            ref={customerVideoRef}
            className="goodtok-video__customer"
          />
        </CustomerVideoContainer>
        <Controls>
          <ButtonCircleWrapper
            onClick={() => {
              setIsCustomerMicrophoneMuted(!isCustomerMicrophoneMuted);
              props.onMicrophoneMuted(isCustomerMicrophoneMuted);
            }}
          >
            {isCustomerMicrophoneMuted ? (
              <CircleMicrophoneMutedIcon />
            ) : (
              <CircleMicrophoneIcon />
            )}
          </ButtonCircleWrapper>
          <ButtonCircleWrapper
            onClick={() => {
              setIsCustomeCameraMuted(!isCustomerCameraMuted);
              props.onCameraMuted(isCustomerCameraMuted);
            }}
          >
            {isCustomerCameraMuted ? (
              <CircleCameraMutedIcon />
            ) : (
              <CircleCameraIcon />
            )}
          </ButtonCircleWrapper>
          <ButtonCircleWrapper onClick={props.onHangup}>
            <CircleHangupIcon />
          </ButtonCircleWrapper>
        </Controls>
      </StaffVideoContainer>
    </MobileVideoContainer>
  );
});

export default MobileVideo;
