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
import { CameraIcon } from "../../icons/CameraIcon";
import { MutedCameraIcon } from "../../icons/MutedCameraIcon";
import { CircleMicrophoneIcon } from "../../icons/CircleMicrophoneIcon";
import { CircleCameraIcon } from "../../icons/CircleCameraIcon";
import { CircleHangupIcon } from "../../icons/CircleHangupIcon";
import { CircleMicrophoneMutedIcon } from "../../icons/CircleMicrophoneMutedIcon";
import { CircleCameraMutedIcon } from "../../icons/CircleCameraMutedIcon";
import { formatTime } from "@goodtok/common";
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";
import {
  ButtonCircleWrapper,
  Controls,
  LocalVideo,
  LocalVideoContainer,
  GoodtokWidget,
  Header,
  HeaderContainer,
  MutedOverlay,
  RemoteVideo,
  RemoteVideoContainer
} from "./VideoStyles";

type FOVideoProps = {
  isLocalCameraMuted: boolean;
  isLocalMicrophoneMuted: boolean;
  isOpen: boolean;
  onHangup: () => void;
  onMuteCamera: () => void;
  onMuteMicrophone: () => void;
};

export const FOVideo = forwardRef((props: FOVideoProps, ref) => {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const remoteVideoRef = React.createRef<HTMLVideoElement>();
  const localVideoRef = React.createRef<HTMLVideoElement>();

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
    <GoodtokWidget style={{ display: props.isOpen ? "block" : "none" }}>
      <Header>
        <HeaderContainer>
          {props.isLocalCameraMuted ? <MutedCameraIcon /> : <CameraIcon />}
          <p>{formatTime(secondsElapsed)}</p>
          <div></div>
        </HeaderContainer>
      </Header>
      <RemoteVideoContainer>
        <audio style={{ display: "none" }} id="goodtok-audio" controls>
          <p>Your browser doesn't support HTML5 audio.</p>
        </audio>
        <RemoteVideo ref={remoteVideoRef} className="goodtok-video__remote" />
        {props.isLocalCameraMuted && (
          <MutedOverlay>
            <MutedCameraIcon />
          </MutedOverlay>
        )}
        <LocalVideoContainer>
          <LocalVideo ref={localVideoRef} className="goodtok-video__local" />
        </LocalVideoContainer>
        <Controls>
          <ButtonCircleWrapper onClick={() => props.onMuteMicrophone()}>
            {props.isLocalMicrophoneMuted ? (
              <CircleMicrophoneMutedIcon />
            ) : (
              <CircleMicrophoneIcon />
            )}
          </ButtonCircleWrapper>
          <ButtonCircleWrapper onClick={() => props.onMuteCamera()}>
            {props.isLocalCameraMuted ? (
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
    </GoodtokWidget>
  );
});

export default FOVideo;
