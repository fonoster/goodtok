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
import { CircleCameraIcon } from "../icons/CircleCameraIcon";
import { CircleHangupIcon } from "../icons/CircleHangupIcon";
import { CircleMicrophoneMutedIcon } from "../icons/CircleMicrophoneMutedIcon";
import { CircleCameraMutedIcon } from "../icons/CircleCameraMutedIcon";
import {
  ButtonCircleWrapper,
  Controls,
  LocalVideo,
  LocalVideoContainer,
  MobileVideoContainer,
  MutedOverlay,
  RemoteVideo,
  RemoteVideoContainer
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
  const remoteVideoRef = React.createRef<HTMLVideoElement>();
  const remoteAudio = React.createRef<HTMLAudioElement>();
  const localVideoRef = React.createRef<HTMLVideoElement>();

  useEffect(() => {
    if (!remoteVideoRef.current || !localVideoRef.current) return;
    remoteVideoRef.current.addEventListener(
      "enterpictureinpicture",
      function () {
        if (!remoteVideoRef.current || !localVideoRef.current) return;
        localVideoRef.current.style.display = "none";
        remoteVideoRef.current.style.top = "0";
      }
    );

    remoteVideoRef.current.addEventListener(
      "leavepictureinpicture",
      function () {
        if (!remoteVideoRef.current || !localVideoRef.current) return;
        localVideoRef.current.style.display = "block";
        remoteVideoRef.current.style.top = "-55px";
      }
    );
  });

  // Expose refs to parent
  useImperativeHandle(ref, () => ({
    remoteVideo: remoteVideoRef.current,
    remoteAudio: remoteAudio.current,
    localVideo: localVideoRef.current
  }));

  useEffect(() => {
    if (props.isOpen) {
      if (remoteVideoRef.current) remoteVideoRef.current.style.opacity = "1";
      if (localVideoRef.current)
        localVideoRef.current.style.opacity = "1";
    } else {
      if (remoteVideoRef.current) remoteVideoRef.current.style.opacity = "0";
      if (localVideoRef.current)
        localVideoRef.current.style.opacity = "0";
    }
  }, [props.isOpen]);

  return (
    <MobileVideoContainer style={{ display: props.isOpen ? "block" : "none" }}>
      <RemoteVideoContainer>
        <audio style={{ display: "none" }} id="goodtok-audio" controls>
          <p>Your browser doesn't support HTML5 audio.</p>
        </audio>
        <RemoteVideo ref={remoteVideoRef} className="goodtok-video__remote" />
        {isCustomerCameraMuted && (
          <MutedOverlay>
            <MutedCameraIcon />
          </MutedOverlay>
        )}
        <LocalVideoContainer>
          <LocalVideo ref={localVideoRef} className="goodtok-video__local" />
        </LocalVideoContainer>
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
      </RemoteVideoContainer>
    </MobileVideoContainer>
  );
});

export default MobileVideo;
