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
import { CloseIcon } from "../icons/CloseIcon";
import { CameraIcon } from "../icons/CameraIcon";
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
  LocalVideo,
  LocalVideoContainer,
  VideoContainer,
  Header,
  HeaderContainer,
  MutedOverlay,
  RemoteVideo,
  RemoteVideoContainer
} from "./VideoStyles";
import { formatTime } from "@goodtok/common";
import { handlePiP } from "./handlePiP";

type VideoProps = {
  isOpen?: boolean;
  initialCameraMutedState: boolean;
  onClose?: () => void;
  onHangup?: () => void;
  onCameraMuted?: (muted: boolean) => void;
  onMicrophoneMuted?: (muted: boolean) => void;
};

export const Video = forwardRef((props: VideoProps, ref) => {
  const [isCustomerCameraMuted, setIsCustomeCameraMuted] = useState(false);
  const [isCustomerMicrophoneMuted, setIsCustomerMicrophoneMuted] =
    useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const remoteVideoRef = React.createRef<HTMLVideoElement>();
  const localVideoRef = React.createRef<HTMLVideoElement>();

  useEffect(() => {
    setIsCustomeCameraMuted(props.initialCameraMutedState || false);
  }, [props.initialCameraMutedState]);

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
    localVideo: localVideoRef.current
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);

    // Clear interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (props.isOpen) {
      if (remoteVideoRef.current) remoteVideoRef.current.style.opacity = "1";
      if (localVideoRef.current) localVideoRef.current.style.opacity = "1";
    } else {
      if (remoteVideoRef.current) remoteVideoRef.current.style.opacity = "0";
      if (localVideoRef.current) localVideoRef.current.style.opacity = "0";
    }
  }, [props.isOpen]);

  return (
    <VideoContainer style={{ display: props.isOpen ? "block" : "none" }}>
      <Header>
        <HeaderContainer>
          {isCustomerCameraMuted ? <MutedCameraIcon /> : <CameraIcon />}
          <p>{formatTime(secondsElapsed)}</p>
          <div onClick={props.onClose}>
            <CloseIcon />
          </div>
        </HeaderContainer>
      </Header>
      <RemoteVideoContainer>
        <RemoteVideo ref={remoteVideoRef} className="goodtok-video__remote" />
        {isCustomerCameraMuted && (
          <MutedOverlay>
            <MutedCameraIcon />
          </MutedOverlay>
        )}
        <LocalVideoContainer>
          <LocalVideo
            ref={localVideoRef}
            className="goodtok-video__local"
            muted
          />
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
          <ButtonCircleWrapper onClick={() => handlePiP(remoteVideoRef)}>
            <CirclePiPIcon />
          </ButtonCircleWrapper>
          <ButtonCircleWrapper onClick={props.onHangup}>
            <CircleHangupIcon />
          </ButtonCircleWrapper>
        </Controls>
      </RemoteVideoContainer>
    </VideoContainer>
  );
});

export default Video;
